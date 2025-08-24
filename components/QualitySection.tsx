"use client";

import { Button } from '@/components/ui/button';

export default function QualitySection() {
  return (
    <section className="bg-matix-green-pale py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-matix-green-dark mb-2">
              100% Produits Avicoles de Qualité Naturelle
            </h2>
            <p className="text-matix-green-medium text-lg">
              Découvrez nos derniers produits en promotion et bénéficiez de remises spéciales
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button className="bg-matix-button hover:bg-matix-yellow text-black px-8 py-3 rounded-lg font-semibold transition-all">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}