'use client';

import React, { useCallback } from 'react';
import Container from '../Container';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { SafeUser } from "@/app/types";
import useProfileModal from '@/app/hooks/useProfileModal';
import { usePathname, useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';


interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser, 
}) => {

    const profileModal = useProfileModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    
    const pathname = usePathname();
    const containsHost = pathname?.includes('/host');

    const onProfile = useCallback(() => {
        if (!currentUser) {
          return loginModal.onOpen();
        }
    
        // open rent modal
        profileModal.onOpen();
      }, [currentUser, loginModal, profileModal])

    return (
    <div className='flex flex-row'>
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            
            <div
                className='py-4 border-b-[1px]'
            >
                <Container>
                    <div className='
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3 
                    md:gap-0
                    '>
                        <div className='text-xl font-bold gap-5 flex flex-row'>
                            <div
                                className='cursor-pointer'
                                onClick={onProfile}
                            >
                                Profile
                            </div>
                            {!containsHost ? <>
                                <p
                                    className='cursor-pointer'
                                    onClick={() => router.push("/trips")}
                                >
                                    trips
                                </p>
                                <p
                                    className='cursor-pointer'
                                    onClick={() => router.push("/favorites")}
                                >
                                    favorites
                                </p>
                            </>
                            : <>
                                <p
                                    className='cursor-pointer'
                                    onClick={() => router.push("/host/reservations")}
                                >
                                    reservation
                                </p>
                                <p
                                    className='cursor-pointer'
                                    onClick={() => router.push("/host/claimReport")}
                                >
                                    reports
                                </p>
                            </>}

                        </div>
                        <Logo />
                        <UserMenu 
                            currentUser={currentUser} 
                        />
                    </div>
                </Container>
            </div>
        </div>
    </div>
  )
}

export default Navbar