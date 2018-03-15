import fallbackLine from './fallbackLine';
import motorway from './motorway';
import narrow from './narrow';
import primary from './primary';
import residential from './residential';
import secondary from './secondary';
import service from './service';
import tertiary from './tertiary';
import track from './track';
import trunk from './trunk';
import unclassified from './unclassified';

export default [
  ...fallbackLine,
  ...motorway,
  ...track,
  ...narrow,
  ...primary,
  ...residential,
  ...secondary,
  ...service,
  ...tertiary,
  ...trunk,
  ...unclassified,
];
