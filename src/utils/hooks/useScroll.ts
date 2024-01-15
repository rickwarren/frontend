import { useRef } from "react";

const useScroll = () => {
  const elRef = useRef<HTMLElement>(null);
  const executeScroll = () => elRef.current?.scrollIntoView();

  return [executeScroll, elRef];
};

export default useScroll;
