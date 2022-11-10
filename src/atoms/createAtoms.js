import { atom, useRecoilState } from 'recoil';

export const titleState = atom({
  key: 'titleState',
  default: 'Untitled1',
});

export const useTitleAtom = () => {
  const [title, setTitle] = useRecoilState(titleState);
  return [title, setTitle];
};
