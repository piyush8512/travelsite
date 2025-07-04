"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, Users, CreditCard, MapPin, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { format } from "date-fns"

const steps = [
  { id: 1, name: "Destination", icon: MapPin },
  { id: 2, name: "Dates", icon: CalendarIcon },
  { id: 3, name: "Travelers", icon: Users },
  { id: 4, name: "Payment", icon: CreditCard },
]

export default function BookingWidget() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    destination: "",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    adults: "2",
    children: "0",
    rooms: "1",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData)
    // Here you would integrate with your booking API
    alert("Booking submitted successfully!")
  }

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-secondary-100 text-secondary-700 hover:bg-secondary-200">Easy Booking</Badge>
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">Book Your Perfect Trip</h2>
          <p className="text-xl text-gray-600">Complete your booking in just a few simple steps</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl font-heading">Complete Your Booking</CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Step {currentStep} of {steps.length}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2 bg-white/20" />
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-2">
                    <div
                      className={`p-2 rounded-full ${
                        currentStep >= step.id ? "bg-white text-primary-600" : "bg-white/20 text-white"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                    </div>
                    <span className={`text-sm font-medium ${currentStep >= step.id ? "text-white" : "text-white/70"}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Step 1: Destination */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Destination</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Select
                      value={bookingData.destination}
                      onValueChange={(value) => setBookingData({ ...bookingData, destination: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bali">Tropical Paradise Bali</SelectItem>
                        <SelectItem value="switzerland">Swiss Alps Adventure</SelectItem>
                        <SelectItem value="maldives">Luxury Maldives Resort</SelectItem>
                        <SelectItem value="tokyo">Tokyo Cultural Journey</SelectItem>
                        <SelectItem value="safari">African Safari Experience</SelectItem>
                        <SelectItem value="santorini">Santorini Sunset Escape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="package">Package Type</Label>
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Package</SelectItem>
                        <SelectItem value="premium">Premium Package</SelectItem>
                        <SelectItem value="luxury">Luxury Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dates */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Your Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "Select check-in date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={bookingData.checkIn}
                          onSelect={(date) => setBookingData({ ...bookingData, checkIn: date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "Select check-out date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={bookingData.checkOut}
                          onSelect={(date) => setBookingData({ ...bookingData, checkOut: date })}
                          disabled={(date) => date < new Date() || (bookingData.checkIn && date <= bookingData.checkIn)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Travelers */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Traveler Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <Label>Adults</Label>
                    <Select
                      value={bookingData.adults}
                      onValueChange={(value) => setBookingData({ ...bookingData, adults: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Adult{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Children</Label>
                    <Select
                      value={bookingData.children}
                      onValueChange={(value) => setBookingData({ ...bookingData, children: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Child" : "Children"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Rooms</Label>
                    <Select
                      value={bookingData.rooms}
                      onValueChange={(value) => setBookingData({ ...bookingData, rooms: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Room{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Payment Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={bookingData.cardName}
                      onChange={(e) => setBookingData({ ...bookingData, cardName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={bookingData.cardNumber}
                      onChange={(e) => setBookingData({ ...bookingData, cardNumber: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={bookingData.expiryDate}
                        onChange={(e) => setBookingData({ ...bookingData, expiryDate: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={bookingData.cvv}
                        onChange={(e) => setBookingData({ ...bookingData, cvv: e.target.value })}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <h4 className="text-lg font-semibold mb-4">Booking Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span className="font-medium">{bookingData.destination || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travelers:</span>
                      <span className="font-medium">
                        {bookingData.adults} Adults, {bookingData.children} Children
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rooms:</span>
                      <span className="font-medium">{bookingData.rooms}</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary-600">$2,499</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="px-6 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 px-6"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 px-8"
                >
                  Complete Booking
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
