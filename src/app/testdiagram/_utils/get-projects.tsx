'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSignOut, useUserEmail, useUserId } from '@nhost/nextjs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Input,
} from '@xyflow/xy-ui';

import useNhostFunction from '@/hooks/useNhostFunction';

const TeamRemoveComponent = () => {
    const [response, setResponse] = useState(null);
    const userId = useUserId();
    const nhostFunction = useNhostFunction();
  
    const fetchData = useCallback(async () => {
        try {
          const res = await nhostFunction('/team/remove', { userId });
          setResponse(res);
          console.log("res", res)
          console.log("response", response)
        } catch (error) {
          console.error('Error fetching data:', error);
          setResponse({ error: 'Error fetching data' });
        }
      }, [userId]); // Include userId as a dependency
    
      useEffect(() => {
        if (userId) {
          fetchData();
        }
      }, [userId, fetchData]); // Dependencies include userId and fetchData
    
      return (
        <div>
          {response ? (
            <pre>{JSON.stringify(response, null, 2)} {response[0].description}</pre>
          ) : (
            'Loading...'
          )}
        </div>
      );
    };
    
    export default TeamRemoveComponent;