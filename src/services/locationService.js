import { supabase } from '../config/supabase';

export const locationService = {
  // Helper function to parse coordinates string
  parseCoordinates(coordinatesString) {
    if (!coordinatesString) return null;
    // Remove parentheses and split by comma
    const coords = coordinatesString.replace('(', '').replace(')', '').split(',');
    return [parseFloat(coords[0]), parseFloat(coords[1])];
  },

  async getAllLocations() {
    const { data, error } = await supabase
      .from('locations')
      .select('*');
    
    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    // Transform the data to parse coordinates
    const transformedData = data.map(location => ({
      ...location,
      coordinates: this.parseCoordinates(location.coordinates)
    }));
    
    console.log('Transformed locations:', transformedData);
    return transformedData;
  },

  async searchLocations(searchTerm) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
    
    if (error) throw error;
    
    return data.map(location => ({
      ...location,
      coordinates: this.parseCoordinates(location.coordinates)
    }));
  },

  async getLocationsByType(type) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('type', type)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getLocationById(id) {
    const { data, error } = await supabase
      .from('locations')
      .select(`
        *,
        reviews (
          rating,
          comment,
          created_at,
          user_id
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};
