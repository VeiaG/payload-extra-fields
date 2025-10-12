'use client';
import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Search, 
  Mail, 
  Calendar, 
  Bell, 
  Heart,
  Star,
  Trash,
  Edit,
  Download,
  Upload,
  File,
  Folder,
  Image,
  Video,
  Music,
  Code,
  Database,
  Server,
  Cloud,
  Lock,
  Unlock,
  Eye,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/shadcnButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

// Mock icon data organized by categories
const iconCategories = [
  {
    name: 'General',
    icons: [
      { name: 'Home', component: Home },
      { name: 'User', component: User },
      { name: 'Settings', component: Settings },
      { name: 'Search', component: Search },
      { name: 'Mail', component: Mail },
      { name: 'Calendar', component: Calendar },
    ]
  },
  {
    name: 'Actions',
    icons: [
      { name: 'Edit', component: Edit },
      { name: 'Trash', component: Trash },
      { name: 'Download', component: Download },
      { name: 'Upload', component: Upload },
      { name: 'Check', component: Check },
      { name: 'X', component: X },
    ]
  },
  {
    name: 'Files',
    icons: [
      { name: 'File', component: File },
      { name: 'Folder', component: Folder },
      { name: 'Image', component: Image },
      { name: 'Video', component: Video },
      { name: 'Music', component: Music },
      { name: 'Code', component: Code },
    ]
  },
  {
    name: 'System',
    icons: [
      { name: 'Database', component: Database },
      { name: 'Server', component: Server },
      { name: 'Cloud', component: Cloud },
      { name: 'Lock', component: Lock },
      { name: 'Unlock', component: Unlock },
      { name: 'Eye', component: Eye },
    ]
  },
  {
    name: 'Notifications',
    icons: [
      { name: 'Bell', component: Bell },
      { name: 'Heart', component: Heart },
      { name: 'Star', component: Star },
      { name: 'AlertCircle', component: AlertCircle },
      { name: 'Info', component: Info },
      { name: 'HelpCircle', component: HelpCircle },
    ]
  }
];

const IconPickerDemo = () => {
  const [selectedIcon, setSelectedIcon] = useState<
    { name: string; component: LucideIcon } | null
  >(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  // Filter icons based on search
  const filteredCategories = searchQuery.trim() === ''
    ? iconCategories
    : iconCategories.map(category => ({
        ...category,
        icons: category.icons.filter(icon =>
          icon.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.icons.length > 0);

  const handleIconSelect = (icon: { name: string; component: LucideIcon }) => {
    setSelectedIcon(icon);
    setIsOpen(false);
    setSearchQuery('');
  };

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(`category-${categoryName}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="icon-picker" className="text-sm font-medium">
          Icon <span className="text-red-500">*</span>
        </Label>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="justify-start gap-2 min-w-[140px]"
              >
                {selectedIcon ? (
                  <>
                    <selectedIcon.component className="w-4 h-4" />
                    <span>{selectedIcon.name}</span>
                  </>
                ) : (
                  'Select Icon'
                )}
              </Button>
            </SheetTrigger>

            {selectedIcon && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedIcon(null)}
                
              >
                <X className="h-4 w-4" />
              </Button>
            )}

          

            <SheetContent side="right" className="w-full sm:max-w-[750px] overflow-hidden flex flex-col p-0">
              <SheetHeader className="px-4 pt-4 pb-2 border-b sticky top-0 bg-background z-10">
                <SheetTitle>Select Icon</SheetTitle>
                <SheetDescription className="sr-only">
                 Choose an icon for this feature
                </SheetDescription>
                
                <div className="space-y-3 pt-2">
                  <Input
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />

                  {searchQuery.trim() === '' && (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowCategories(!showCategories)}
                        className="w-full justify-between"
                      >
                        <span>Browse by category</span>
                        {showCategories ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>

                      {showCategories && (
                        <div className="flex flex-wrap gap-2 pt-2 pb-2">
                          {iconCategories.map((category) => (
                            <Badge
                              key={category.name}
                              variant="secondary"
                              className="cursor-pointer hover:bg-secondary/80"
                              onClick={() => {
                                scrollToCategory(category.name);
                                setShowCategories(false);
                              }}
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    No icons found
                  </div>
                ) : (
                  <div className="space-y-6 pt-4">
                    {filteredCategories.map((category) => (
                      <div 
                        key={category.name} 
                        id={`category-${category.name}`}
                        className="scroll-mt-4"
                      >
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold text-foreground/80 mb-1">
                            {category.name}
                          </h3>
                          <div className="h-px bg-border" />
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,85px))] gap-2.5">
                          {category.icons.map((icon) => {
                            const IconComponent = icon.component;
                            const isSelected = selectedIcon?.name === icon.name;
                            
                            return (
                              <div key={icon.name} className="relative group">
                                <button
                                  type="button"
                                  onClick={() => handleIconSelect(icon)}
                                  className={`
                                    w-full aspect-square p-3 rounded border-2 
                                    transition-all duration-200 flex items-center justify-center
                                    hover:bg-accent hover:border-accent-foreground/20 hover:-translate-y-0.5
                                    hover:shadow-md focus-visible:outline-none focus-visible:ring-2 
                                    focus-visible:ring-ring focus-visible:ring-offset-2
                                    active:translate-y-0
                                    ${isSelected 
                                      ? 'border-primary bg-primary/5 shadow-md' 
                                      : 'border-border bg-background'
                                    }
                                  `}
                                >
                                  <IconComponent className="w-6 h-6" />
                                </button>
                                
                                <div className="
                                  absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5
                                  bg-popover text-popover-foreground text-xs rounded shadow-md
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                  transition-all duration-200 pointer-events-none whitespace-nowrap
                                  z-50
                                ">
                                  {icon.name}
                                  <div className="
                                    absolute top-full left-1/2 -translate-x-1/2
                                    border-4 border-transparent border-t-popover
                                  " />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <p className="text-sm text-muted-foreground">
          Choose an icon for this feature
        </p>
      </div>
    </div>
  );
};

export default IconPickerDemo;