import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { EmailContext, EmailType } from '../EmailProvider';
import { AuthContext } from '../AuthProvider';

function EmailContentScreen() {
    const { id } = useParams();
    const auth = useContext(AuthContext)
    const stateEmails = useContext(EmailContext)
    const [email, setEmail] = useState<EmailType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        setIsLoading(true)
        getEmailById(id)
        markEmailAsRead(id)
        setIsLoading(false);

    }, [])

    async function getEmailById(id: string | undefined) {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/email/get-mail/${id}`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                "Authorization": `Bearer ${auth?.state?.token}`
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.error(error);
        });
        return setEmail(data)
    }

    async function markEmailAsRead(id: string | undefined) {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/email/read-mail`, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                "Authorization": `Bearer ${auth?.state?.token}`
            },
            body: JSON.stringify({ id })
        }).then(response => {


            return response.json();
        }).catch(error => {
            console.error(error);
        });

        // const updatedEmails = stateEmails?.emails.map((email: EmailType) => {
        //     if (email.id.toString() === id) {
        //         return { ...email, isread: true }
        //     }
        //     return email;
        // })
        // stateEmails?.setEmails(updatedEmails ?? stateEmails.emails)
    }


    return isLoading ? <div className='w-full h-screen flex items-center justify-center '>
        <p className='font-semibold text-lg'>Loading...</p>
    </div> : (
        <div className=' w-full h-screen bg-[#010014]/50 relative flex flex-col items-center justify-center p-4'>
            <div className='w-full h-full bg-white p-5'>
                <h1 className='text-2xl font-semibold mb-5'>{email?.subject}</h1>
                <br />
                <p className='text-lg'>{email?.body}</p>
            </div>
        </div>
    )
}

export default EmailContentScreen