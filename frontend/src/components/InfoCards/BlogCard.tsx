import {
  CardMedia,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import useInfoCardStyle from './InfoCardStyle';

interface BlogCardProps {
  image: any;
  title: string;
  description: string;
  onReadMore: () => void;
  page?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  description,
  onReadMore,
  page,
}) => {
  const style = useInfoCardStyle();

  return (
    <Card
      className={page === 'pet-care' ? style.petCareCard : style.card}
      data-testid="card"
    >
      <CardMedia
        component="img"
        image={image}
        data-testid="card-media"
        className={page === 'pet-care' ? style.petCareImage : undefined}
      />
      <CardContent>
        <Typography
          gutterBottom
          className={style.cardTitle}
          data-testid="titlu"
        >
          {title}
        </Typography>
        <Typography className={style.description}>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </Typography>
      </CardContent>
      <CardActions className={style.cardAction}>
        <Button
          size="small"
          className={style.seeMoreButton}
          onClick={onReadMore}
          data-testid="read-more-button"
        >
          <PetsIcon />
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
