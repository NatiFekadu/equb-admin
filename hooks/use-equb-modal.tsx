import {create} from 'zustand';

interface useEqubModalInterface {
    isOpen : boolean;
    onOpen:()=>void;
    onClose:()=>void;
};

export const useEqubModal = create <useEqubModalInterface>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})

}))