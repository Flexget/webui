import capitalize from 'js-capitalize';

const pluginMap = {
  IMDB: {
    genre: 'imdb_genres',
    poster: 'imdb_photo',
    rating: 'imdb_score',
    votes: 'imdb_votes',
    description: 'imdb_plot_outline',
    link: 'imdb_url',
  },
  TheTVDB: {
    genre: 'tvdb_genres',
    poster: 'tvdb_posters',
    rating: 'tvdb_rating',
    description: 'tvdb_overview',
    link: 'tvdb_url',
  },
  TVMaze: {
    genre: 'imdb_genres',
    poster: 'tvmaze_series_original_image',
    rating: 'imdb_score',
    description: 'tvmaze_series_summary',
  },
  Trakt: {
    genre: 'trakt_genres',
    rating: 'trakt_rating',
    description: 'trakt_series_overview',
    votes: 'trakt_series_votes',
  },
  TMDB: {
    genre: 'tmdb_genres',
    poster: 'tmdb_posters',
    rating: 'tmdb_rating',
    description: 'tmdb_tagline',
  },
};

export function getFieldValuesMap(fields, type) {
  const fieldMap = {};
  Object.entries(pluginMap).forEach(([plugin, map]) => {
    if (map[type] && fields[map[type]]) {
      fieldMap[plugin] = fields[map[type]];
    }
  });
  return fieldMap;
}

export function getFieldValuesArray(fields, type) {
  const values = [];
  Object.values(pluginMap).forEach(map => {
    if (map[type] && fields[map[type]]) {
      const value = fields[map[type]];
      values.push(...(Array.isArray(value) ? value : [value]));
    }
  });
  return values;
}

export default class FlexGetEntry {
  constructor(entry) {
    this.id = entry.id;
    this.url = entry.original_url;
    this.listId = entry.list_id;
    this.approved = entry.approved;
    this.title = entry.title;

    this.fields = { ...entry.entry };
    if ('url' in this.fields) {
      delete this.fields.url;
    }

    this.titleFormatted = this.formatTitle();
    this.quality = this.getQualities();
    this.genres = this.getGenres();
    this.posters = this.getPosters();
    this.descriptions = this.getDescriptions();
    this.links = this.getLinks();
    this.ratings = this.getRatings();
  }

  formatTitle() {
    if (this.fields.series_name) {
      const epId = this.fields.series_id ? ` ${this.fields.series_id}` : '';
      return `${this.fields.series_name}${epId}`;
    }

    if (this.fields.movie_name) {
      const year = this.fields.movie_year ? ` (${this.fields.movie_year})` : '';
      return `${this.fields.movie_name}${year}`;
    }
    return this.fields.title;
  }

  getRatings() {
    const votes = getFieldValuesMap(this.fields, 'votes');
    return Object.entries(getFieldValuesMap(this.fields, 'rating')).map(([site, rating]) => ({
      site,
      rating,
      votes: site ? votes[site] : 0,
    }));
  }

  getQualities() {
    const quality = (this.fields.quality || '').trim();
    if (quality) {
      return quality.split(' ');
    }
    return [];
  }

  getPosters() {
    return getFieldValuesArray(this.fields, 'poster');
  }

  getGenres() {
    const genres = getFieldValuesArray(this.fields, 'genre').map(g => g.toLowerCase());
    const unique = Array.from(new Set(genres));
    return unique.map(g => capitalize.words(g));
  }

  getDescriptions() {
    return getFieldValuesArray(this.fields, 'description');
  }

  getLinks() {
    return getFieldValuesMap(this.fields, 'link');
  }
}
