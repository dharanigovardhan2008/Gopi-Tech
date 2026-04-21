import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  createdAt: Timestamp;
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  service: string;
  budget: string;
  description: string;
  deadline?: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  clientId?: string;
  createdAt: Timestamp;
}

export interface Portfolio {
  id?: string;
  projectName: string;
  description: string;
  techStack: string[];
  category: string;
  liveLink: string;
  thumbnailURL?: string;
  createdAt: Timestamp;
}

// User operations
export const createUser = async (uid: string, userData: Omit<User, 'uid' | 'createdAt'>) => {
  await setDoc(doc(db, 'users', uid), {
    ...userData,
    createdAt: Timestamp.now()
  });
};

export const getUser = async (uid: string): Promise<User | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { uid, ...docSnap.data() } as User;
  }
  return null;
};

export const getAllUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User));
};

export const updateUserRole = async (uid: string, role: 'admin' | 'employee' | 'client') => {
  await updateDoc(doc(db, 'users', uid), { role });
};

// Booking operations
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'bookings'), {
    ...bookingData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getAllBookings = async (): Promise<Booking[]> => {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, 'bookings'), 
    where('clientId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

export const getAssignedBookings = async (employeeId: string): Promise<Booking[]> => {
  const q = query(
    collection(db, 'bookings'), 
    where('assignedTo', '==', employeeId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

export const updateBooking = async (id: string, data: Partial<Booking>) => {
  await updateDoc(doc(db, 'bookings', id), data);
};

export const deleteBooking = async (id: string) => {
  await deleteDoc(doc(db, 'bookings', id));
};

// Portfolio operations
export const createPortfolio = async (portfolioData: Omit<Portfolio, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'portfolio'), {
    ...portfolioData,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};

export const getAllPortfolio = async (): Promise<Portfolio[]> => {
  const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Portfolio));
};

export const updatePortfolio = async (id: string, data: Partial<Portfolio>) => {
  await updateDoc(doc(db, 'portfolio', id), data);
};

export const deletePortfolio = async (id: string) => {
  await deleteDoc(doc(db, 'portfolio', id));
};
