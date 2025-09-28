'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { QrCode, ScanLine } from 'lucide-react';
import QrScanner from 'react-qr-scanner';
import { useToast } from '@/hooks/use-toast';

export function QrCodeScanner() {
  const [open, setOpen] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const { toast } = useToast();

  const handleScan = (data: any) => {
    if (data && data.text) {
        try {
            const parsedData = JSON.parse(data.text);
            setScannedData(parsedData);
            setOpen(false); // Close scanner on successful scan
            
            // Mock API call to update database
            toast({
                title: "Progress Synced!",
                description: `Updated progress for ${parsedData.studentName}.`,
            });

        } catch (error) {
            console.error("Failed to parse QR code data:", error);
            toast({
                variant: 'destructive',
                title: 'Scan Error',
                description: 'Invalid QR code format. Please try again.',
            })
        }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    toast({
        variant: 'destructive',
        title: 'Scanner Error',
        description: 'Could not access the camera. Please check permissions.',
    })
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <QrCode className="mr-2" /> Sync Progress via QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ScanLine /> Scan Student QR Code
          </DialogTitle>
          <DialogDescription>
            Point your camera at the QR code on the student's device to sync their progress.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 bg-muted rounded-lg relative overflow-hidden">
          {open && (
             <QrScanner
                onScan={handleScan}
                onError={handleError}
                constraints={{
                    audio: false,
                    video: { facingMode: "environment" }
                }}
                style={{ width: '100%' }}
            />
          )}
          <div className="absolute inset-0 border-4 border-primary/50 rounded-lg pointer-events-none" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
