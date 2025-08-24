"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function FeaturedCategories() {
  const categories = [
    { name: "Poussins", icon: "🐥", count: "120+ produits" },
    { name: "Œufs à Couver", icon: "🥚", count: "80+ produits" },
    { name: "Poulaillers", icon: "🏠", count: "90+ produits" },
    { name: "Aliments", icon: "🌾", count: "200+ produits" },
    { name: "Vaccins", icon: "💉", count: "60+ produits" },
    { name: "Équipements", icon: "⚡", count: "180+ produits" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Catégories Vedettes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez parmi plus de 15 catégories et des milliers de produits avicoles 
            de qualité supérieure
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href="/categories">
              <Card 
                className="p-6 text-center hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}