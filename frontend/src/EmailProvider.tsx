import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';


export type EmailType = {
    id: number,
    subject: string,
    body: string,
    isread: boolean,
}





type EmailContextType = {
    emails: Array<EmailType> | [];
    setEmails: React.Dispatch<React.SetStateAction<Array<EmailType>>>
};

export const EmailContext = createContext<EmailContextType | null>(null);





function EmailProvider({ children }: { children: React.ReactNode }) {
    const [emails, setEmails] = useState<EmailType[]>([]);



    return (
        <EmailContext.Provider value={{ emails, setEmails }}>
            {children}
        </EmailContext.Provider>
    );
}

export default EmailProvider;
