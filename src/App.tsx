/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MenuItem, 
  Reservation, 
  ReservationStatus, 
  SiteSettings, 
  MediaItem, 
  TabType,
  CategoryType
} from './types';
import { 
  initialMenuItems, 
  initialReservations, 
  initialSiteSettings, 
  initialMediaItems 
} from './data/initialData';

import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';
import { DashboardView } from './components/DashboardView';
import { MenuCMSView } from './components/MenuCMSView';
import { ReservationsView } from './components/ReservationsView';
import { SettingsView } from './components/SettingsView';
import { BentoMediaView } from './components/BentoMediaView';
import { AnalyticsView } from './components/AnalyticsView';
import { ReportsView } from './components/ReportsView';
import { ConsumerWebsiteView } from './components/ConsumerWebsiteView';

import { NewReservationModal } from './components/NewReservationModal';
import { MenuModal } from './components/MenuModal';
import { PromotionModal } from './components/PromotionModal';
import { ReservationDetailsModal } from './components/ReservationDetailsModal';

export default function App() {
  // State initialization with localStorage fallback
  const [currentTab, setCurrentTab] = useState<TabType>(() => {
    return (localStorage.getItem('totot_current_tab') as TabType) || 'dashboard';
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('totot_menu_items');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('totot_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('totot_site_settings');
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('totot_media_items');
    return saved ? JSON.parse(saved) : initialMediaItems;
  });

  // Modals state
  const [isNewResModalOpen, setIsNewResModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [selectedResDetails, setSelectedResDetails] = useState<Reservation | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('totot_current_tab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('totot_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('totot_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('totot_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('totot_media_items', JSON.stringify(mediaItems));
  }, [mediaItems]);

  // Handler functions
  const handleToggleMenuAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const handleSaveMenuItem = (itemData: Partial<MenuItem>) => {
    if (editingMenuItem) {
      setMenuItems(prev => prev.map(item => 
        item.id === editingMenuItem.id ? { ...item, ...itemData } : item
      ));
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: itemData.name || 'New Item',
        description: itemData.description || '',
        price: itemData.price || 0,
        category: (itemData.category as CategoryType) || 'specialties',
        image: itemData.image || 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
        available: itemData.available !== undefined ? itemData.available : true,
        isFeatured: !!itemData.isFeatured
      };
      setMenuItems(prev => [newItem, ...prev]);
    }
    setEditingMenuItem(null);
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm('Are you sure you want to remove this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleExportMenuJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(menuItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "totot_menu_catalog.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleUpdateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(prev => prev.filter(res => res.id !== id));
  };

  const handleCreateReservation = (newRes: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const resEntry: Reservation = {
      ...newRes,
      id: `res-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [resEntry, ...prev]);
  };

  const handleSelectFeaturedDish = (dishId: string) => {
    setMenuItems(prev => prev.map(item => ({
      ...item,
      isFeatured: item.id === dishId
    })));
  };

  const handleToggleMediaFeatured = (id: string) => {
    setMediaItems(prev => prev.map(m => 
      m.id === id ? { ...m, featuredOnBento: !m.featuredOnBento } : m
    ));
  };

  const handleAddMedia = (newItem: Omit<MediaItem, 'id' | 'likes'>) => {
    const created: MediaItem = {
      ...newItem,
      id: `media-${Date.now()}`,
      likes: Math.floor(Math.random() * 50) + 12
    };
    setMediaItems(prev => [created, ...prev]);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
  };

  // If consumer site view is selected
  if (currentTab === 'consumer_site') {
    return (
      <ConsumerWebsiteView
        menuItems={menuItems}
        siteSettings={siteSettings}
        mediaItems={mediaItems}
        onReturnToAdmin={() => setCurrentTab('dashboard')}
        onSubmitReservation={handleCreateReservation}
      />
    );
  }

  // Pending reservations badge count
  const pendingCount = reservations.filter(r => r.status === 'Pending').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDFCF5] text-[#1A1A1A] font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        pendingReservationsCount={pendingCount}
        onOpenNewReservation={() => setIsNewResModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#FDFCF5]">
        {/* Persistent Top App Bar */}
        <TopAppBar
          currentTab={currentTab}
          brandName={siteSettings.brandName}
          onNavigate={(tab) => setCurrentTab(tab)}
          onOpenNewReservation={() => setIsNewResModalOpen(true)}
        />

        {/* View Router */}
        <main className="flex-1 overflow-y-auto bg-[#FDFCF5] flex flex-col">
          {currentTab === 'dashboard' && (
            <DashboardView
              reservations={reservations}
              menuItems={menuItems}
              siteSettings={siteSettings}
              onNavigateToReservations={() => setCurrentTab('reservations')}
              onNavigateToMenu={() => setCurrentTab('menu')}
              onNavigateToMedia={() => setCurrentTab('bento_media')}
              onManagePromotion={() => setIsPromoModalOpen(true)}
              onOpenReservationDetails={(res) => setSelectedResDetails(res)}
            />
          )}

          {currentTab === 'menu' && (
            <MenuCMSView
              menuItems={menuItems}
              onToggleAvailability={handleToggleMenuAvailability}
              onAddNewItem={() => {
                setEditingMenuItem(null);
                setIsMenuModalOpen(true);
              }}
              onEditItem={(item) => {
                setEditingMenuItem(item);
                setIsMenuModalOpen(true);
              }}
              onDeleteItem={handleDeleteMenuItem}
              onExportJSON={handleExportMenuJSON}
            />
          )}

          {currentTab === 'reservations' && (
            <ReservationsView
              reservations={reservations}
              onUpdateStatus={handleUpdateReservationStatus}
              onDeleteReservation={handleDeleteReservation}
              onOpenNewReservation={() => setIsNewResModalOpen(true)}
              onOpenReservationDetails={(res) => setSelectedResDetails(res)}
            />
          )}

          {currentTab === 'bento_media' && (
            <BentoMediaView
              mediaItems={mediaItems}
              onToggleFeatured={handleToggleMediaFeatured}
              onAddMedia={handleAddMedia}
              onDeleteMedia={handleDeleteMedia}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              settings={siteSettings}
              onSaveSettings={(newSettings) => setSiteSettings(newSettings)}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              reservations={reservations}
              menuItems={menuItems}
              onNavigateToReservations={() => setCurrentTab('reservations')}
              onNavigateToMenu={() => setCurrentTab('menu')}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              reservations={reservations}
              menuItems={menuItems}
              siteSettings={siteSettings}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <NewReservationModal
        isOpen={isNewResModalOpen}
        onClose={() => setIsNewResModalOpen(false)}
        onSubmit={handleCreateReservation}
      />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => {
          setIsMenuModalOpen(false);
          setEditingMenuItem(null);
        }}
        onSave={handleSaveMenuItem}
        itemToEdit={editingMenuItem}
      />

      <PromotionModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        menuItems={menuItems}
        onSelectFeaturedDish={handleSelectFeaturedDish}
      />

      <ReservationDetailsModal
        reservation={selectedResDetails}
        isOpen={!!selectedResDetails}
        onClose={() => setSelectedResDetails(null)}
        onUpdateStatus={handleUpdateReservationStatus}
        onDelete={handleDeleteReservation}
      />
    </div>
  );
}
