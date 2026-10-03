'use client'

import { useSyncExternalStore } from 'react'
import type { OSKey } from '@/data/apps'

function detectOS(): OSKey {
  const ua = navigator.userAgent
  const platform = navigator.platform
  if (/Android TV|Google TV|SmartTV|TV/i.test(ua) && /Android/i.test(ua)) return 'androidtv'
  if (/AppleTV|tvOS/i.test(ua)) return 'appletv'
  if (/iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && 'ontouchend' in document)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  if (/Win/i.test(ua)) return 'windows'
  if (/Mac/i.test(ua)) return 'macos'
  if (/Linux/i.test(ua)) return 'linux'
  return 'windows'
}

const subscribe = () => () => {}

export function useDetectOS(): OSKey | null {
  return useSyncExternalStore(subscribe, detectOS, () => null)
}
