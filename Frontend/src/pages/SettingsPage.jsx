import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/button';
import Slider from '../components/ui/slider';
import Select from '../components/ui/select';
import { Settings, Bell, Shield, Sliders, RefreshCw } from 'lucide-react';

const settingsSchema = z.object({
  emailAlerts: z.boolean(),
  aiTips: z.boolean(),
  orderTracking: z.boolean(),
  cameraResolution: z.string(),
  responseLength: z.number().min(50).max(500)
});

export const SettingsPage = () => {
  const { user, updateProfile } = useAuthStore();

  const {
    register: registerField,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty }
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      emailAlerts: user?.notifications?.emailAlerts ?? true,
      aiTips: user?.notifications?.aiTips ?? true,
      orderTracking: user?.notifications?.orderTracking ?? true,
      cameraResolution: '1080p',
      responseLength: 250
    }
  });

  const onSubmit = (data) => {
    updateProfile({
      notifications: {
        emailAlerts: data.emailAlerts,
        aiTips: data.aiTips,
        orderTracking: data.orderTracking
      }
    });
    alert('System settings successfully saved!');
  };

  const responseLengthVal = watch('responseLength');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings size={18} className="text-primary" />
          <span>System Settings</span>
        </h2>
        <p className="text-xs text-muted">Configure alert notifications, adjust webcam resolution settings, and customize AI response metrics</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: System Categories */}
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-border text-white bg-zinc-800">
            <Sliders size={16} className="text-primary" />
            <span className="text-xs font-semibold">Workspace Configuration</span>
          </div>
          <div className="glass-panel p-4 rounded-xl flex items-center gap-3 text-muted hover:text-primary cursor-pointer transition-colors">
            <Shield size={16} />
            <span className="text-xs font-semibold">Security & Tokens</span>
          </div>
        </div>

        {/* Right Side: Configuration Form */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Notifications Card */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-white border-b border-border pb-2.5">
              <Bell size={15} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Alert Notifications</h3>
            </div>

            <div className="space-y-3">
              {[
                { name: 'emailAlerts', label: 'Email Order Summaries', desc: 'Receive invoice copies and tracking updates directly in inbox.' },
                { name: 'aiTips', label: 'AI Spatial Layout Warnings', desc: 'Allow AI Buddy to pop up alerts for clearance constraints.' },
                { name: 'orderTracking', label: 'Live Shipping Telemetry', desc: 'Get real-time push alerts when items clear custom hubs.' }
              ].map((item) => (
                <label key={item.name} className="flex items-start gap-3.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-zinc-800 text-primary accent-primary mt-0.5 cursor-pointer bg-background focus:ring-0"
                    {...registerField(item.name)}
                  />
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-primary transition-colors block">{item.label}</span>
                    <span className="text-[10px] text-muted mt-0.5 block">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* AI parameters card */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-white border-b border-border pb-2.5">
              <Sliders size={15} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider">AI Copilot Parameters</h3>
            </div>

            <div className="space-y-4">
              {/* Slider for response length */}
              <Slider
                label="Maximum Response Length"
                min={50}
                max={500}
                step={10}
                value={responseLengthVal}
                onChange={(val) => setValue('responseLength', val, { shouldDirty: true })}
                valueDisplay={`${responseLengthVal} characters`}
              />

              {/* Select camera resolution */}
              <Select
                label="Camera Scanner Quality"
                options={[
                  { value: '720p', label: '720p HD (Low bandwidth)' },
                  { value: '1080p', label: '1080p Full HD (Recommended)' },
                  { value: '4k', label: '4K Ultra HD (High precision)' }
                ]}
                value={watch('cameraResolution')}
                onChange={(val) => setValue('cameraResolution', val, { shouldDirty: true })}
                placeholder=""
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
            disabled={!isDirty}
          >
            Save Settings
          </Button>

        </div>

      </form>
    </div>
  );
};

export default SettingsPage;
