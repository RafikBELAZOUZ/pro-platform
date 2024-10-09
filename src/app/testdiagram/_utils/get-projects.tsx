'use client';

import { useState, useEffect } from 'react';
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
  
    const fetchData = async () => {
      const ress = await nhostFunction('/team/remove', { userId: userId });
      setResponse(ress);  // Store the response in state
    };
  
    useEffect(() => {
      fetchData();  // Fetch data when the component is mounted
    }, [userId]);  // Run this effect whenever `userId` changes
  
    return (
      <div>
        {response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>  // Format response as JSON
        ) : (
          'Loading...'  // Show a loading message while the data is being fetched
        )}
      </div>
    );
  };
  
  export default TeamRemoveComponent;