import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function useMyBooking() {

    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchMyBooking()
    }, [])

    async function fetchMyBooking() {
        setLoading(true);
        setError('');

        const { data, error } = await supabase
            .from('bookings')
            .select('*, equipment(id, name, code, category, image_url)');

        if (error) {
            setError(error.message);
        } else {
            setBooking(data);
        }

        setLoading(false);
    }

    return { booking, setBooking, loading, error }
}