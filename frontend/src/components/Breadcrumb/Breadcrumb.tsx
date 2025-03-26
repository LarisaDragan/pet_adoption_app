import { useLocation, Link } from 'react-router-dom';
import BreadcrumbStyle from './BreadcrumbStyle';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '');
  const style = BreadcrumbStyle();

  return (
    <div data-testid="bread" className={style.breadcrumbs}>
      {/* Add manual breadcrumb for "home" */}
      <div key="/" className={style.breadcrumbsFirstDiv}>
        <Link to="/">Home</Link>
      </div>

      {/* Map over the rest of the path segments */}
      {pathnames.map((_, index) => {
        const pathSegments = pathnames.slice(0, index + 1);
        const path = `/${pathSegments.join('/')}`;
        const crumb = pathSegments[index]; // Use current segment as crumb text
        let crumbText;
        switch (crumb) {
          case 'adoptapet':
            crumbText = 'Adopt a pet';
            break;
          case 'rehomeapet':
            crumbText = 'Rehome a pet';
            break;
          case 'petprofile':
            crumbText = 'Pet profile';
            break;
          default:
            break;
        }

        const isLastSegment = index === pathnames.length - 1;

        return (
          <div key={path}>
            {/* Conditionally render the link */}
            {isLastSegment ? (
              <span className={style.currentBreadcrumb}>{crumbText}</span> // Render as text if last segment
            ) : (
              <Link to={path}>
                {/* Render the crumb text */}
                {crumbText}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
