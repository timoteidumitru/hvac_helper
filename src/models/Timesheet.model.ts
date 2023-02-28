import mongoose from 'mongoose';
import { ProfileDocument } from './Profile.model';

const timesheetSchema = new mongoose.Schema({
  profileID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  today: {
    normalHours: {
      type: Number
    },
    overtime: {
      type: Number
    }
  },
  thisWeek: {
    normalHours: {
      mon: { type: Number },
      tue: { type: Number },
      wed: { type: Number },
      thu: { type: Number },
      fri: { type: Number },
      sat: { type: Number },
      sun: { type: Number }
    },
    overtime: {
      mon: { type: Number },
      tue: { type: Number },
      wed: { type: Number },
      thu: { type: Number },
      fri: { type: Number },
      sat: { type: Number },
      sun: { type: Number }
    }
  },
  twoWeeks: [
    {
      weekOne: {
        normalHours: {
          mon: { type: Number },
          tue: { type: Number },
          wed: { type: Number },
          thu: { type: Number },
          fri: { type: Number },
          sat: { type: Number },
          sun: { type: Number }
        },
        overtime: {
          mon: { type: Number },
          tue: { type: Number },
          wed: { type: Number },
          thu: { type: Number },
          fri: { type: Number },
          sat: { type: Number },
          sun: { type: Number }
        }
      },
      weekTwo: {
        normalHours: {
          mon: { type: Number },
          tue: { type: Number },
          wed: { type: Number },
          thu: { type: Number },
          fri: { type: Number },
          sat: { type: Number },
          sun: { type: Number }
        },
        overtime: {
          mon: { type: Number },
          tue: { type: Number },
          wed: { type: Number },
          thu: { type: Number },
          fri: { type: Number },
          sat: { type: Number },
          sun: { type: Number }
        }
      }
    }
  ],
  lastMonth: {
    normalHours: {
      type: Number
    },
    overtime: {
      type: Number
    }
  },
  lastYear: {
    normalHours: {
      type: Number
    },
    overtime: {
      type: Number
    }
  }
});

export interface TimesheetDocument extends mongoose.Document {
  profile: ProfileDocument['_id'];
  today: {
    normalHours: number;
    overtime: number;
  };
  thisWeek: {
    normalHours: {
      mon: number;
      tue: number;
      wed: number;
      thu: number;
      fri: number;
      sat: number;
      sun: number;
    };
    overtime: {
      mon: number;
      tue: number;
      wed: number;
      thu: number;
      fri: number;
      sat: number;
      sun: number;
    };
  };
  twoWeeks: [
    {
      weekOne: {
        normalHours: {
          mon: number;
          tue: number;
          wed: number;
          thu: number;
          fri: number;
          sat: number;
          sun: number;
        };
        overtime: {
          mon: number;
          tue: number;
          wed: number;
          thu: number;
          fri: number;
          sat: number;
          sun: number;
        };
      };
      weekTwo: {
        normalHours: {
          mon: number;
          tue: number;
          wed: number;
          thu: number;
          fri: number;
          sat: number;
          sun: number;
        };
        overtime: {
          mon: number;
          tue: number;
          wed: number;
          thu: number;
          fri: number;
          sat: number;
          sun: number;
        };
      };
    }
  ];
  lastMonth: {
    normalHours: number;
    overtime: number;
  };
  lastYear: {
    normalHours: number;
    overtime: number;
  };
}

export const Timesheet = mongoose.model<TimesheetDocument>('Timesheet', timesheetSchema);
