"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CheckCircle2 } from "lucide-react"

const steps = ["Select Contact", "Enter Amount", "OTP Verification", "Confirmation"]

export interface Contact {
  id: string
  name: string
  phoneNumber: string
}

const contacts: Contact[] = [
  { id: "1", name: "John Doe", phoneNumber: "+1 234 567 8901" },
  { id: "2", name: "Jane Smith", phoneNumber: "+1 987 654 3210" },
  { id: "3", name: "Alice Johnson", phoneNumber: "+1 555 123 4567" },
]

export function RequestMoneyModal({ isOpen, onClose, onRequestMoney }: { isOpen: boolean; onClose: () => void; onRequestMoney: (amount: number, contact: Contact) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [amount, setAmount] = useState("")
  const [otp, setOtp] = useState("")

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      if (selectedContact !== null) {
        onRequestMoney(Number.parseFloat(amount), selectedContact)
      }
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Label htmlFor="contact">Select Contact</Label>
            <Select onValueChange={(value) => setSelectedContact(contacts.find((c) => c.id === value) || null)}>
              <SelectTrigger id="contact">
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedContact && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Contact Details:</p>
                <p className="text-sm">Name: {selectedContact.name}</p>
                <p className="text-sm">ID: {selectedContact.id}</p>
                <p className="text-sm">Phone: {selectedContact.phoneNumber}</p>
              </div>
            )}
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="amount">Amount to Request</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter the OTP sent to your registered mobile number</p>
            <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Money Request Sent</p>
            {selectedContact !== null ? (
              <p className="text-sm text-muted-foreground">
                ${amount} has been requested from {selectedContact.name}.
              </p>

            ) : (
              <p className="text-sm text-muted-foreground">Request for ${amount} has been sent.</p>
            )}
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {renderStepContent()}
          <div className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
            )}
            <Button onClick={handleContinue} className="ml-auto">
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

