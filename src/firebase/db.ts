import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { FolioItem } from '../types';

export interface UserProfileData {
  id: string;
  email: string;
  displayName: string;
  institution?: string;
  role?: 'Curator' | 'Fellow' | 'Researcher' | 'Reviewer';
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryData {
  id: string;
  authorId: string;
  name: string;
  email: string;
  inquiryType?: string;
  message: string;
  isUrgent?: boolean;
  activeFolio?: string;
  status?: 'Pending' | 'Reviewed' | 'Archived';
  createdAt: string;
}

export interface AnnotationData {
  id: string;
  authorId: string;
  folioId: string;
  title: string;
  text: string;
  category?: string;
  metric?: string;
  createdAt: string;
}

// User Profile Operations
export async function syncUserProfile(profile: UserProfileData): Promise<void> {
  const path = `users/${profile.id}`;
  try {
    const ref = doc(db, 'users', profile.id);
    const existingSnap = await getDoc(ref);
    if (!existingSnap.exists()) {
      await setDoc(ref, {
        ...profile,
        createdAt: new Date().toISOString()
      });
    } else {
      await updateDoc(ref, {
        displayName: profile.displayName,
        email: profile.email,
        institution: profile.institution || 'Stanford University',
        updatedAt: new Date().toISOString()
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Folios Operations
export async function saveFolio(folio: FolioItem, authorId: string): Promise<void> {
  const path = `folios/${folio.id}`;
  try {
    const ref = doc(db, 'folios', folio.id);
    await setDoc(
      ref,
      {
        id: folio.id,
        authorId,
        title: folio.title,
        folioNumber: folio.folioNumber,
        subtitle: folio.subtitle,
        status: folio.status,
        feasibility: folio.feasibility,
        trl: folio.trl,
        payload: folio.payload,
        updated: folio.updated,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export function subscribeToFolios(
  onData: (folios: FolioItem[]) => void,
  onError?: (err: unknown) => void
): () => void {
  const path = 'folios';
  const q = collection(db, path);
  return onSnapshot(
    q,
    (snapshot) => {
      const folios: FolioItem[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: d.id || docSnap.id,
          folioNumber: d.folioNumber || `#FOLIO-${docSnap.id.slice(0, 4)}`,
          title: d.title || 'Untitled Folio',
          subtitle: d.subtitle || 'Spatial Engineering System',
          status: (d.status as 'ACTIVE' | 'EXPERIMENTAL' | 'ARCHIVED') || 'ACTIVE',
          feasibility: typeof d.feasibility === 'number' ? d.feasibility : 85,
          trl: d.trl || 'TRL-5',
          payload: d.payload || '1.84 kg',
          updated: d.updated || 'Recent'
        };
      });
      onData(folios);
    },
    (err) => {
      if (onError) onError(err);
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

// Inquiries Operations
export async function submitInquiry(inquiry: InquiryData): Promise<void> {
  const path = `inquiries/${inquiry.id}`;
  try {
    const ref = doc(db, 'inquiries', inquiry.id);
    await setDoc(ref, {
      ...inquiry,
      status: inquiry.status || 'Pending',
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export function subscribeToUserInquiries(
  authorId: string,
  onData: (inquiries: InquiryData[]) => void
): () => void {
  const path = 'inquiries';
  const q = query(collection(db, path), where('authorId', '==', authorId));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: InquiryData[] = snapshot.docs.map((d) => d.data() as InquiryData);
      onData(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

// Annotations Operations
export async function createAnnotation(annotation: AnnotationData): Promise<void> {
  const path = `annotations/${annotation.id}`;
  try {
    const ref = doc(db, 'annotations', annotation.id);
    await setDoc(ref, {
      ...annotation,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export function subscribeToAnnotations(
  folioId: string,
  onData: (annotations: AnnotationData[]) => void
): () => void {
  const path = 'annotations';
  const q = collection(db, path);
  return onSnapshot(
    q,
    (snapshot) => {
      const items: AnnotationData[] = snapshot.docs
        .map((d) => d.data() as AnnotationData)
        .filter((a) => !folioId || a.folioId === folioId);
      onData(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}
