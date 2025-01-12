"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, Filter, Loader2, ShoppingCart, Tag, Euro, Dices, Palette, Ruler } from 'lucide-react';
import { appName, categoryStr, budgetStr, applyFilters, random, buy, currency, giftStr } from './strings.json';

const GiftFinder = () => {
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [budget, setBudget] = useState(0);
  const [randomGift, setRandomGift] = useState(null);
  const [showRandom, setShowRandom] = useState(false);
  const [loadingRandom, setLoadingRandom] = useState(false); // Loading state for random gift
  const [selectedGift, setSelectedGift] = useState(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchGifts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchGifts = async () => {
    setLoading(true);
    try {
      const body = {
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(budget && { budget: budget })
      };

      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to fetch gifts');

      const data = await response.json();
      setGifts(data.gifts);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomGift = async () => {
    setLoadingRandom(true); // Start loading for random gift
    setShowRandom(true); // Open the modal immediately

    const body = {
      ...(selectedCategory !== 'all' && { category: selectedCategory }),
      ...(budget && { budget: budget })
    };

    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to fetch random gift');

      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.gifts.length);
      setRandomGift(data.gifts[randomIndex]);
    } catch (error) {
      console.error('Error fetching random gift:', error);
    } finally {
      setLoadingRandom(false); // Stop loading once the random gift is fetched
    }
  };

  const handleCardClick = (gift) => {
    setSelectedGift(gift);
    setShowGiftModal(true);
  };

  const handleBuyClick = (gift, event) => {
    event.stopPropagation();
    setSelectedGift(gift);
    setShowGiftModal(true);
  };

  const formatPrice = (price) => {
    return price % 1 === 0 ? `${currency}${price}` : `${currency}${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center mb-8">
          <Gift className="h-8 w-8 mr-2 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800">{appName}</h1>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col justify-center">
                <label className="text-sm font-medium flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-2" />
                  {categoryStr.title}
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={categoryStr.choose} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{categoryStr.all}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-center">
                <label className="text-sm font-medium flex items-center mb-2">
                  <Euro className="h-4 w-4 mr-2" />
                  {budget === 0
                    ? `${budgetStr.title}: ${budgetStr.none}`
                    : `${budgetStr.title}: ${currency}${budget}`}
                </label>
                <Slider
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                  max={500} 
                  step={5} 
                />
              </div>

              <div className="flex flex-col justify-center items-stretch gap-4">
                <Button className="flex-1" onClick={fetchGifts}>
                  <Filter className="h-4 w-4 mr-2" />
                  {applyFilters}
                </Button>
                <Button variant="outline" onClick={handleRandomGift}>
                  <Dices className="h-4 w-4 mr-2" />
                  {random.button}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gifts.map((gift, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" onClick={() => handleCardClick(gift)}>
                <CardContent className="flex flex-col justify-center h-full pt-6">
                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold mb-2">{gift.Name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{gift.Brand}</p>
                    <p className="text-purple-600 font-medium mb-4">{formatPrice(gift.Price)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {gift.Category}
                    </span>
                    <Button variant="outline" size="sm" onClick={(e) => handleBuyClick(gift, e)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {buy}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={showGiftModal} onOpenChange={setShowGiftModal}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-purple-600" />
                <DialogTitle>{giftStr.title}</DialogTitle>
              </div>
            </DialogHeader>

            {selectedGift && (
              <div className="p-4">
                <h3 className="font-semibold mb-2">{selectedGift.Name}</h3>
                <p className="text-sm text-gray-500 mb-2">{selectedGift.Brand}</p>
                <p className="text-purple-600 font-medium mb-4">
                  {formatPrice(selectedGift.Price)}
                </p>
                <div className="flex items-center mb-2">
                  {selectedGift.Color && (
                    <div className="flex flex-col items-start mr-4">
                      <div className="flex items-center">
                        <Palette className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-gray-500">{giftStr.color}</span>
                      </div>
                      <span className="text-black">{selectedGift.Color}</span>
                    </div>
                  )}
                  {selectedGift.Size && (
                    <div className="flex flex-col items-start">
                      <div className="flex items-center">
                        <Ruler className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-gray-500">{giftStr.size}</span>
                      </div>
                      <span className="text-black">{selectedGift.Size}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {selectedGift.Category}
                  </span>
                  <a
                    href={selectedGift['Purchase Link']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {buy}
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showRandom} onOpenChange={setShowRandom}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-purple-600" />
                <DialogTitle>{random.title}</DialogTitle>
              </div>
            </DialogHeader>

            {/* Modal Content: Show loader first */}
            {loadingRandom ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              </div>
            ) : (
              randomGift && (
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{randomGift.Name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{randomGift.Brand}</p>
                  <p className="text-purple-600 font-medium mb-4">
                      {formatPrice(randomGift.Price)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {randomGift.Category}
                    </span>
                    <a
                      href={randomGift['Purchase Link']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {buy}
                      </Button>
                    </a>
                  </div>
                </div>
              )
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GiftFinder;
