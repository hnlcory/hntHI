import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * A collection of users and the variable values associated with the collection and users.
 */
class UsersCollection {
  constructor() {
    // Name the collection
    this.name = 'UsersCollection';
    // Define the Mongo Collection
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each variable in collection
    this.schema = new SimpleSchema({
      email: { type: String, index: true, unique: true },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      role: { type: String, optional: true },
      profilePicture: { type: String, optional: true },
      location: { type: String, optional: true },
      bio: { type: String, optional: true },
      arriveTime: { type: String, optional: true },
      leaveTime: { type: String, optional: true },
      contact: { type: String, optional: true },
      rating: { type: Number, optional: true },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Users = new UsersCollection();
