'use client';

import * as z from 'zod';
import { Equb } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertModal } from '@/components/modals/alert-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
  initialData: Equb;
}
const formSchema = z.object({
  name: z.string().min(3),
  desc: z.string().min(10),
});
type SettingsFormValues = z.infer<typeof formSchema>;
export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/equbs/${params.equbId}`, data);
      router.refresh();
      toast.success('Equb Updated');
    } catch (error) {
      toast.error('something went wrong');
    } finally {
      setLoading(false);
    }
  };
   const onDelete = async () =>{
    try {
      setLoading(true);
      await axios.delete(`/api/equbs/${params.equbId}`)
      router.refresh();
      router.push('/');
      toast.success('Equb Deleted');
      
    } catch (error) {
      toast.error("Make Sure You REmove all Members first");
      console.log(error);
      
    } finally{
      setLoading(false)
      setOpen(false)
    }
   }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage equb preferences" />
        <Button
          disabled={loading}
          onClickCapture={() => setOpen(true)}
          variant="destructive"
          size="icon"
          onClick={() => {}}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Equb Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Equb Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} typeof="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
