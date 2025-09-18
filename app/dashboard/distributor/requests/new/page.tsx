"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DistributorLayout from '@/components/DistributorLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { authService } from '@/lib/auth';
import { 
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Save,
  Send
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  name_fr: string;
  icon: string;
}

export default function NewRequestPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    quantity: '',
    weight: '',
    unit: 'piece',
    deadline: '',
    description: '',
    budget_max: '',
    delivery_location: '',
    status: 'active'
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const requestData = {
        ...formData,
        distributor_id: currentUser.id,
        quantity: parseInt(formData.quantity),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        status: isDraft ? 'draft' : 'active'
      };

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (data.success) {
        router.push('/dashboard/distributor/requests');
      } else {
        setError(data.error || 'Erreur lors de la création de la demande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la création de la demande');
    } finally {
      setLoading(false);
    }
  };

  const unitOptions = [
    { value: 'piece', label: 'Pièce(s)' },
    { value: 'kg', label: 'Kilogramme(s)' },
    { value: 'lot', label: 'Lot(s)' },
    { value: 'sac', label: 'Sac(s)' },
    { value: 'liter', label: 'Litre(s)' }
  ];

  return (
    <DistributorLayout currentUser={currentUser} activePage="requests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouvelle Demande de Livraison</h1>
            <p className="text-gray-600">Créez une demande pour trouver des producteurs</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <Card className="p-6">
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-2" />
                  Titre de la demande *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Recherche 50 poulets fermiers pour restaurant"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name_fr || category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Package className="h-4 w-4 inline mr-2" />
                  Quantité *
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="50"
                    required
                    className="flex-1"
                  />
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                  >
                    {unitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poids par unité (kg)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="1.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date limite *
                </label>
                <Input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Budget maximum (FCFA)
                </label>
                <Input
                  type="number"
                  name="budget_max"
                  value={formData.budget_max}
                  onChange={handleInputChange}
                  placeholder="250000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Lieu de livraison
                </label>
                <Input
                  name="delivery_location"
                  value={formData.delivery_location}
                  onChange={handleInputChange}
                  placeholder="Dakar, Sénégal"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
                placeholder="Décrivez vos besoins spécifiques, qualité souhaitée, conditions particulières..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit(new Event('submit') as any, true)}
                disabled={loading}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Sauvegarder comme brouillon</span>
              </Button>
              
              <Button
                type="submit"
                disabled={loading}
                className="bg-matix-green-medium hover:bg-matix-green-dark text-white flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Publication...' : 'Publier la demande'}</span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DistributorLayout>
  );
}