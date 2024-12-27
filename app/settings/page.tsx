'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { 
  Settings2,
  Volume2,
  Bell,
  Moon,
  Timer,
  Music2,
  Save,
  User
} from 'lucide-react'
import { getCurrentUser, updateUserProgress } from '@/lib/auth/local-storage'

interface UserSettings {
  volume: number
  darkMode: boolean
  notifications: boolean
  sessionDuration: number
  preferredFrequencies: number[]
  email: string
  name: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState<UserSettings>({
    volume: 50,
    darkMode: true,
    notifications: true,
    sessionDuration: 15,
    preferredFrequencies: [7.83],
    email: '',
    name: ''
  })

  useEffect(() => {
    const userData = getCurrentUser()
    if (userData) {
      setUser(userData)
      setSettings({
        volume: userData.preferences?.volume || 50,
        darkMode: true,
        notifications: userData.preferences?.notifications || true,
        sessionDuration: userData.preferences?.sessionDuration || 15,
        preferredFrequencies: userData.preferences?.preferredFrequencies || [7.83],
        email: userData.email || '',
        name: userData.username || ''
      })
    }
  }, [])

  const handleSave = () => {
    if (user) {
      updateUserProgress({
        preferences: {
          volume: settings.volume,
          notifications: settings.notifications,
          sessionDuration: settings.sessionDuration,
          preferredFrequencies: settings.preferredFrequencies
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Customize your experience</p>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <User className="h-5 w-5 text-purple-400" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm">Display Name</Label>
                <Input
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="bg-black/40 border-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="bg-black/40 border-purple-500/20"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Practice Settings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Settings2 className="h-5 w-5 text-purple-400" />
                Practice Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Volume */}
              <div className="space-y-2">
                <Label className="flex items-center gap-x-2">
                  <Volume2 className="h-4 w-4 text-purple-400" />
                  Default Volume
                </Label>
                <Slider
                  value={[settings.volume]}
                  onValueChange={([value]) => setSettings({ ...settings, volume: value })}
                  min={0}
                  max={100}
                  className="bg-purple-500/10"
                />
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Session Duration */}
              <div className="space-y-2">
                <Label className="flex items-center gap-x-2">
                  <Timer className="h-4 w-4 text-purple-400" />
                  Default Session Duration
                </Label>
                <Slider
                  value={[settings.sessionDuration]}
                  onValueChange={([value]) => setSettings({ ...settings, sessionDuration: value })}
                  min={5}
                  max={60}
                  step={5}
                  className="bg-purple-500/10"
                />
                <p className="text-xs text-gray-400">{settings.sessionDuration} minutes</p>
              </div>

              <Separator className="bg-purple-500/20" />

              {/* Preferred Frequency */}
              <div className="space-y-2">
                <Label className="flex items-center gap-x-2">
                  <Music2 className="h-4 w-4 text-purple-400" />
                  Default Frequency
                </Label>
                <Slider
                  value={settings.preferredFrequencies}
                  onValueChange={(value) => setSettings({ ...settings, preferredFrequencies: value })}
                  min={1}
                  max={40}
                  step={0.01}
                  className="bg-purple-500/10"
                />
                <p className="text-xs text-gray-400">{settings.preferredFrequencies[0]} Hz</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Settings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Bell className="h-5 w-5 text-purple-400" />
                App Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-x-2">
                  <Moon className="h-4 w-4 text-purple-400" />
                  Dark Mode
                </Label>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                />
              </div>

              <Separator className="bg-purple-500/20" />

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-x-2">
                  <Bell className="h-4 w-4 text-purple-400" />
                  Notifications
                </Label>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 