import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a collection that allows two-way searching of users and their locations
 */
class UsersLocationsCollection {
  constructor() {
    // Name the collection
    this.name = 'UsersLocationsCollection';
    // Define the Mongo Collection.
    this.collection = new Mongo.Collection(this.name);
    /* Define the structure of the collection elements, which would just be the profile and the location */
    this.schema = new SimpleSchema({
      profile: String,
      location: String,
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const UsersLocations = new UsersLocationsCollection();
