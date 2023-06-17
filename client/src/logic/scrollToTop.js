import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;
  const productID = useMemo(() => new URLSearchParams(search), [search]).get('id')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, productID]);
  return null;
}