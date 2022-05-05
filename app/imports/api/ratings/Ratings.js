import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class RatingsCollection {
  constructor() {
    // The name of this collection
    this.name = 'RatingsCollection';
    // Define the Mongo collection
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of the documents in the collection
    this.schema = new SimpleSchema({
      rating: { type: Number, index: true, unique: true },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Ratings = new RatingsCollection();