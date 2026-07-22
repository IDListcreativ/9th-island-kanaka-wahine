'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { initialState, MockAnnouncement, MockAppState, MockNotification, MockPost, MockReport, MockThread, MockUser, ResourceItem, ResourceKind } from '@/app/data/mock'

const STORAGE_KEY = 'ninth-island-prototype-state-v1'

type ResourceDraft = Partial<ResourceItem> & Pick<ResourceItem, 'name' | 'category' | 'description'>

type MockAppContextValue = MockAppState & {
  loading: boolean
  createItem: (kind: ResourceKind, draft: ResourceDraft) => ResourceItem
  updateItem: (kind: ResourceKind, slug: string, draft: Partial<ResourceItem>) => void
  deleteItem: (kind: ResourceKind, slug: string) => void
  toggleFavorite: (kind: ResourceKind, slug: string) => void
  isFavorite: (kind: ResourceKind, slug: string) => boolean
  signIn: (email: string) => void
  signUp: (name: string, email: string) => void
  signOut: () => void
  updateProfile: (user: MockUser) => void
  addNotification: (notification: Omit<MockNotification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationsRead: () => void
  addPost: (content: string, topic: string) => void
  deletePost: (id: string) => void
  addAnnouncement: (announcement: Pick<MockAnnouncement, 'title' | 'body' | 'audience'>) => void
  updateAnnouncement: (id: string, announcement: Pick<MockAnnouncement, 'title' | 'body' | 'audience'>) => void
  deleteAnnouncement: (id: string) => void
  toggleAnnouncementPinned: (id: string) => void
  sendMessage: (threadId: string, body: string) => void
  addReport: (item: ResourceItem, reason: string) => void
  updateReportStatus: (id: string, status: MockReport['status']) => void
}

const MockAppContext = createContext<MockAppContextValue | null>(null)

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function uniqueSlug(items: ResourceItem[], name: string, currentSlug?: string) {
  const base = slugify(name) || 'item'
  let slug = base
  let index = 2

  while (items.some((item) => item.slug !== currentSlug && item.slug === slug)) {
    slug = `${base}-${index}`
    index += 1
  }

  return slug
}

function loadStoredState(): MockAppState {
  if (typeof window === 'undefined') return initialState
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) return initialState

  try {
    const parsed = JSON.parse(stored) as Partial<MockAppState>

    return {
      ...initialState,
      ...parsed,
      resources: {
        ...initialState.resources,
        ...(parsed.resources || {}),
      },
      favorites: parsed.favorites || initialState.favorites,
      notifications: parsed.notifications || initialState.notifications,
      threads: parsed.threads || initialState.threads,
      posts: parsed.posts || initialState.posts,
      announcements: parsed.announcements || initialState.announcements,
      reports: parsed.reports || initialState.reports,
      user: typeof parsed.user === 'undefined' ? initialState.user : parsed.user,
    }
  } catch {
    return initialState
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MockAppState>(initialState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState(loadStoredState())
      setLoading(false)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [loading, state])

  const addNotification = useCallback((notification: Omit<MockNotification, 'id' | 'createdAt' | 'read'>) => {
    setState((current) => ({
      ...current,
      notifications: [{ ...notification, id: uid('notification'), read: false, createdAt: new Date().toISOString() }, ...current.notifications],
    }))
  }, [])

  const createItem = useCallback((kind: ResourceKind, draft: ResourceDraft) => {
    const now = new Date().toISOString()
    const item: ResourceItem = {
      id: uid(kind),
      slug: uniqueSlug(state.resources[kind], draft.name),
      type: kind,
      name: draft.name,
      subtitle: draft.subtitle || draft.category,
      category: draft.category,
      description: draft.description,
      location: draft.location || 'Las Vegas Valley',
      address: draft.address,
      date: draft.date,
      time: draft.time,
      price: draft.price,
      phone: draft.phone,
      website: draft.website,
      organizer: draft.organizer || state.user?.name || 'Community member',
      status: draft.status || (kind === 'events' ? 'upcoming' : 'active'),
      rating: draft.rating,
      reviews: draft.reviews,
      attendees: draft.attendees,
      capacity: draft.capacity,
      members: draft.members,
      favoriteCount: 0,
      tags: draft.tags?.length ? draft.tags : [draft.category],
      highlights: draft.highlights?.length ? draft.highlights : ['Community submitted', 'Editable prototype record', 'Saved on this device'],
      image: draft.image || 'from-ocean-600 via-teal-500 to-sand-300',
      createdAt: now,
      updatedAt: now,
    }

    setState((current) => {
      const itemWithCurrentSlug = {
        ...item,
        slug: uniqueSlug(current.resources[kind], draft.name),
      }

      return {
        ...current,
        resources: { ...current.resources, [kind]: [itemWithCurrentSlug, ...current.resources[kind]] },
        notifications: [{ id: uid('notification'), title: `${itemWithCurrentSlug.name} created`, body: `Your ${kind === 'listings' ? 'marketplace listing' : kind.slice(0, -1)} is visible in this prototype.`, type: 'system', read: false, createdAt: now }, ...current.notifications],
      }
    })

    return item
  }, [state.resources, state.user?.name])

  const updateItem = useCallback((kind: ResourceKind, slug: string, draft: Partial<ResourceItem>) => {
    setState((current) => ({
      ...current,
      resources: {
        ...current.resources,
        [kind]: current.resources[kind].map((item) => item.slug === slug ? { ...item, ...draft, slug: item.slug, updatedAt: new Date().toISOString() } : item),
      },
    }))
  }, [])

  const deleteItem = useCallback((kind: ResourceKind, slug: string) => {
    setState((current) => ({
      ...current,
      resources: { ...current.resources, [kind]: current.resources[kind].filter((item) => item.slug !== slug) },
      favorites: current.favorites.filter((favorite) => favorite !== `${kind}:${slug}`),
    }))
  }, [])

  const toggleFavorite = useCallback((kind: ResourceKind, slug: string) => {
    const key = `${kind}:${slug}`
    setState((current) => ({ ...current, favorites: current.favorites.includes(key) ? current.favorites.filter((favorite) => favorite !== key) : [key, ...current.favorites] }))
  }, [])

  const isFavorite = useCallback((kind: ResourceKind, slug: string) => state.favorites.includes(`${kind}:${slug}`), [state.favorites])
  const signIn = useCallback((email: string) => setState((current) => ({ ...current, user: { ...(current.user || initialState.user!), email } })), [])
  const signUp = useCallback((name: string, email: string) => setState((current) => ({ ...current, user: { id: uid('user'), name, email, phone: '', neighborhood: 'Las Vegas', bio: 'New 9th Island community member.', interests: ['Events', 'Vendors'] } })), [])
  const signOut = useCallback(() => setState((current) => ({ ...current, user: null })), [])
  const updateProfile = useCallback((user: MockUser) => setState((current) => ({ ...current, user })), [])
  const markNotificationsRead = useCallback(() => setState((current) => ({ ...current, notifications: current.notifications.map((notification) => ({ ...notification, read: true })) })), [])
  const addPost = useCallback((content: string, topic: string) => setState((current) => ({ ...current, posts: [{ id: uid('post'), author: current.user?.name || 'Community Member', content, topic, likes: 0, comments: 0, createdAt: new Date().toISOString() }, ...current.posts] })), [])
  const deletePost = useCallback((id: string) => setState((current) => ({ ...current, posts: current.posts.filter((post: MockPost) => post.id !== id) })), [])
  const addAnnouncement = useCallback((announcement: Pick<MockAnnouncement, 'title' | 'body' | 'audience'>) => {
    setState((current) => ({
      ...current,
      announcements: [
        {
          id: uid('announcement'),
          ...announcement,
          pinned: false,
          createdAt: new Date().toISOString(),
        },
        ...current.announcements,
      ],
    }))
  }, [])
  const updateAnnouncement = useCallback((id: string, announcement: Pick<MockAnnouncement, 'title' | 'body' | 'audience'>) => {
    setState((current) => ({
      ...current,
      announcements: current.announcements.map((item) => item.id === id ? { ...item, ...announcement } : item),
    }))
  }, [])
  const deleteAnnouncement = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      announcements: current.announcements.filter((announcement) => announcement.id !== id),
    }))
  }, [])
  const toggleAnnouncementPinned = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      announcements: current.announcements.map((announcement) => announcement.id === id ? { ...announcement, pinned: !announcement.pinned } : announcement),
    }))
  }, [])
  const sendMessage = useCallback((threadId: string, body: string) => setState((current) => ({ ...current, threads: current.threads.map((thread: MockThread) => thread.id === threadId ? { ...thread, messages: [...thread.messages, { id: uid('message'), sender: 'me', body, createdAt: new Date().toISOString() }] } : thread) })), [])
  const addReport = useCallback((item: ResourceItem, reason: string) => {
    const now = new Date().toISOString()

    setState((current) => ({
      ...current,
      reports: [
        {
          id: uid('report'),
          resourceKey: `${item.type}:${item.slug}`,
          title: item.name,
          reason,
          reporter: current.user?.name || 'Community member',
          status: 'open',
          createdAt: now,
        },
        ...current.reports,
      ],
      notifications: [
        {
          id: uid('notification'),
          title: `${item.name} sent to moderation`,
          body: 'A mock admin report was created for review.',
          type: 'system',
          read: false,
          createdAt: now,
        },
        ...current.notifications,
      ],
    }))
  }, [])
  const updateReportStatus = useCallback((id: string, status: MockReport['status']) => {
    setState((current) => ({
      ...current,
      reports: current.reports.map((report) => report.id === id ? { ...report, status } : report),
    }))
  }, [])

  const value = useMemo(() => ({ ...state, loading, createItem, updateItem, deleteItem, toggleFavorite, isFavorite, signIn, signUp, signOut, updateProfile, addNotification, markNotificationsRead, addPost, deletePost, addAnnouncement, updateAnnouncement, deleteAnnouncement, toggleAnnouncementPinned, sendMessage, addReport, updateReportStatus }), [addAnnouncement, addNotification, addPost, addReport, createItem, deleteAnnouncement, deleteItem, deletePost, isFavorite, loading, markNotificationsRead, sendMessage, signIn, signOut, signUp, state, toggleAnnouncementPinned, toggleFavorite, updateAnnouncement, updateItem, updateProfile, updateReportStatus])

  return <MockAppContext.Provider value={value}>{children}</MockAppContext.Provider>
}

export function useMockApp() {
  const context = useContext(MockAppContext)
  if (!context) throw new Error('useMockApp must be used inside Providers')
  return context
}
