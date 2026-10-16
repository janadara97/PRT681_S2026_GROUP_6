# Traceability: see RTM_Schedule_Ride_Feature.xlsx. Each scenario carries @TS (test), @US (story), @AC (criterion) and @SCR (screen) tags.
# Assumed 'now' for all time-based scenarios: 2026-10-06 09:00 local time.
# Scenarios tagged @derived cover criteria added during test design (not written in the BRD).
# Scenarios tagged @assumption depend on an open question (see Gaps and Questions sheet).

@schedule-ride @rider-app
Feature: Schedule a ride in advance
  As a rider
  I want to book, manage and be reminded about a ride for a future time
  So that I have reliable transportation for planned, time-sensitive trips

  Background:
    Given the rider is signed in to the app
    And the rider has a valid payment method on file
    And the current local date and time is "2026-10-06 09:00"

  # ---- US-01: Schedule a Future Ride ----
  Rule: A rider can schedule a ride for a future date and time

    @TS-01 @US-01 @AC-01.1 @SCR-01 @positive
    Scenario: Select a valid future date and time
      Given the rider has entered pickup "123 Harbor View Rd, Farrar" and drop-off "Darwin International Airport"
      When the rider taps "Schedule for Later"
      Then the rider can choose a pickup date and time
      When the rider selects "2026-10-07" at "9:30 AM"
      Then the booking summary shows the pickup time "Tomorrow, 9:30 AM"

    @TS-02 @US-01 @AC-01.2 @SCR-02 @SCR-03 @positive
    Scenario: Confirm booking shows confirmation details
      Given the rider has selected "2026-10-07" at "9:30 AM" for a ride from "123 Harbor View Rd, Farrar" to "Darwin International Airport"
      And driver supply is likely for that time and location
      When the rider taps "Review booking"
      And the rider taps "Confirm booking"
      Then the app shows a booking confirmation
      And the confirmation shows the pickup location, the pickup time "9:30 AM" and an estimated fare range
      And the rider is not charged until pickup

    @TS-03 @US-01 @AC-01.1 @SCR-01 @boundary
    Scenario: Earliest allowed time (15 minutes ahead) is accepted
      Given the rider is scheduling a ride
      When the rider selects "2026-10-06" at "9:15 AM"
      Then the time is accepted
      And "Review booking" is available

    @TS-04 @US-01 @AC-01.1 @SCR-01 @boundary
    Scenario: Latest allowed time (30 days ahead) is accepted
      Given the rider is scheduling a ride
      When the rider selects "2026-11-05" at "9:00 AM"
      Then the time is accepted
      And "Review booking" is available

    @TS-05 @US-01 @AC-01.4 @SCR-08 @negative @derived
    Scenario: Time less than 15 minutes ahead is rejected
      Given the rider is scheduling a ride
      When the rider selects "2026-10-06" at "9:10 AM"
      Then the app shows an error that pickup must be at least 15 minutes from now
      And "Review booking" is not available

    @TS-06 @US-01 @AC-01.4 @SCR-08 @negative @derived
    Scenario: Time more than 30 days ahead is rejected
      Given the rider is scheduling a ride
      When the rider selects "2026-11-05" at "9:15 AM"
      Then the app shows an error that pickup cannot be more than 30 days ahead
      And "Review booking" is not available

    @TS-07 @US-01 @AC-01.3 @SCR-05 @negative
    Scenario: No driver supply shows warning and alternative times
      Given the rider has selected "2026-10-07" at "3:00 AM" for a ride from "123 Harbor View Rd, Farrar" to "Darwin International Airport"
      And driver supply is unlikely for that time and location
      When the rider attempts to confirm the booking
      Then the app shows a warning that a driver may not be available
      And the app suggests alternative pickup times
      And no scheduled ride is created

    @TS-08 @US-01 @AC-01.5 @SCR-02 @positive @derived
    Scenario: Review screen shows summary, fare and cancellation policy
      Given the rider has selected "2026-10-07" at "9:30 AM" for a ride from "123 Harbor View Rd, Farrar" to "Darwin International Airport"
      When the rider taps "Review booking"
      Then the review screen shows the pickup, drop-off, date and time, and estimated fare
      And the review screen shows "Free cancellation up to 60 minutes before pickup. A fee applies after that."

  # ---- US-02: View and Manage Scheduled Rides ----
  Rule: A rider can view their scheduled rides

    @TS-09 @US-02 @AC-02.1 @SCR-04 @positive
    Scenario: Upcoming scheduled rides are listed
      Given the rider has these scheduled rides:
        | drop-off                      | date       | time    |
        | Darwin International Airport  | 2026-10-07 | 9:30 AM |
        | CBD Office Tower, 21 Smith St | 2026-10-09 | 6:15 PM |
      When the rider opens "Your Trips"
      Then both rides are listed
      And each ride shows its date, time and pickup and drop-off details

    @TS-10 @US-02 @AC-02.2 @SCR-04 @positive
    Scenario: Ride details show Edit and Cancel options
      Given the rider has a scheduled ride to "Darwin International Airport"
      When the rider taps that ride in "Your Trips"
      Then the ride details are shown
      And the "Edit" and "Cancel ride" options are available

    @TS-11 @US-02 @AC-02.3 @SCR-07 @alternate
    Scenario: Empty state when no rides are scheduled
      Given the rider has no scheduled rides
      When the rider opens "Your Trips"
      Then an empty state is shown
      And the empty state prompts the rider to schedule a ride

  # ---- US-03: Modify or Cancel a Scheduled Ride ----
  Rule: A rider can modify or cancel a scheduled ride

    @TS-12 @US-03 @AC-03.1 @SCR-04 @SCR-04b @positive
    Scenario: Cancel more than 60 minutes before pickup is free
      Given the rider has a scheduled ride for "2026-10-07" at "9:30 AM"
      When the rider taps "Cancel ride"
      Then the app states that cancelling now is free
      When the rider confirms the cancellation
      Then the ride is cancelled
      And no cancellation fee is charged
      And the rider sees a cancellation confirmation

    @TS-13 @US-03 @AC-03.1 @SCR-04 @SCR-04b @boundary @assumption
    Scenario: Cancel exactly 60 minutes before pickup (assumed free)
      # ASSUMPTION: exactly 60 minutes is inside the free-cancellation window (see open question Q-01)
      Given the rider has a scheduled ride with pickup at "2026-10-06" at "10:00 AM"
      When the rider cancels the ride at "09:00 AM"
      Then no cancellation fee is charged

    @TS-14 @US-03 @AC-03.2 @SCR-06 @negative
    Scenario: Cancel within 60 minutes shows fee before confirming
      Given the rider has a scheduled ride with pickup at "2026-10-06" at "9:45 AM"
      When the rider taps "Cancel ride"
      Then the app shows the applicable cancellation fee before asking for confirmation
      When the rider confirms the cancellation
      Then the ride is cancelled
      And the cancellation fee is applied

    @TS-15 @US-03 @AC-03.4 @SCR-04b @alternate @derived
    Scenario: Rider keeps the ride after opening cancel
      Given the rider has a scheduled ride for "2026-10-07" at "9:30 AM"
      And the rider has tapped "Cancel ride"
      When the rider taps "Keep ride"
      Then the ride remains scheduled
      And no cancellation fee is charged

    @TS-16 @US-03 @AC-03.3 @SCR-01 @SCR-02 @positive
    Scenario: Edit pickup time re-validates availability
      Given the rider has a scheduled ride for "2026-10-07" at "9:30 AM"
      And driver supply is likely at "10:30 AM"
      When the rider edits the pickup time to "10:30 AM"
      Then the system re-validates driver availability
      And the confirmation shows the pickup time "10:30 AM"

    @TS-17 @US-03 @AC-03.3 @SCR-01 @SCR-02 @negative
    Scenario: Edit to a time with no supply is rejected
      Given the rider has a scheduled ride for "2026-10-07" at "9:30 AM"
      And driver supply is unlikely at "3:00 AM"
      When the rider edits the pickup time to "3:00 AM"
      Then the app shows a warning that a driver may not be available
      And the ride remains scheduled for "9:30 AM"

    @TS-18 @US-03 @AC-03.5 @SCR-04 @negative @derived
    Scenario: Edit is unavailable after dispatch
      Given the rider has a scheduled ride that has been dispatched to a driver
      When the rider opens the ride details
      Then the "Edit" option is not available

  # ---- US-04: Receive Pickup Reminders ----
  Rule: A rider receives reminders before pickup

    @TS-19 @US-04 @AC-04.1 @NTF-01 @SCR-03 @positive
    Scenario: 24-hour reminder is sent
      Given the rider has a scheduled ride for "2026-10-09" at "6:15 PM"
      And push notifications are enabled
      When the time reaches "2026-10-08" at "6:15 PM"
      Then the rider receives a push notification reminder

    @TS-20 @US-04 @AC-04.2 @NTF-01 @positive
    Scenario Outline: 1-hour and 10-minute reminders show driver status
      Given the rider has a scheduled ride for "2026-10-09" at "6:15 PM"
      And the driver status is "<driver status>"
      When "<interval>" remain before pickup
      Then the rider receives a push notification reminder
      And the reminder shows the driver assignment status "<driver status>"

      Examples:
        | interval   | driver status    |
        | 1 hour     | driver assigned  |
        | 1 hour     | not yet assigned |
        | 10 minutes | driver assigned  |

    @TS-21 @US-04 @AC-04.3 @NTF-01 @alternate
    Scenario: Notifications off still show in-app reminder
      Given the rider has a scheduled ride for "2026-10-09" at "6:15 PM"
      And push notifications are disabled on the rider's device
      When a reminder time is reached
      Then the reminder appears in the in-app notification center

    @TS-22 @US-04 @AC-04.4 @NTF-01 @boundary @derived
    Scenario: No 24-hour reminder when booked less than 24 hours ahead
      Given the rider books a ride for "2026-10-06" at "4:00 PM"
      Then no 24-hour reminder is sent
      When the time reaches "3:00 PM"
      Then the rider receives the 1-hour reminder

    @TS-23 @US-04 @AC-04.5 @NTF-01 @alternate @derived
    Scenario: Cancelling a ride stops its reminders
      Given the rider has a scheduled ride for "2026-10-09" at "6:15 PM"
      When the rider cancels the ride
      Then no further reminders are sent for that ride

  # ---- US-05: Driver Receives and Accepts Scheduled Trip ----
  Rule: A driver-partner can receive and accept a scheduled trip

    @TS-24 @US-05 @AC-05.1 @DRV-01 @positive
    Scenario: Driver receives request when the assignment window opens
      Given a scheduled ride with pickup at "2026-10-09" at "6:15 PM"
      And the assignment window opens 30 minutes before pickup
      When the time reaches "2026-10-09" at "5:45 PM"
      Then an eligible driver-partner receives a trip request
      And the request shows the pickup time, pickup location and estimated fare

    @TS-25 @US-05 @AC-05.2 @DRV-01 @positive
    Scenario: Accepting locks the trip to the driver
      Given a driver-partner has received a scheduled trip request
      When the driver accepts the request
      Then the trip is assigned to that driver
      And the trip is removed from other drivers' request queues

    @TS-26 @US-05 @AC-05.3 @DRV-01 @alternate
    Scenario: Declined request is reassigned
      Given a driver-partner has received a scheduled trip request
      When the driver declines the request
      Then the system offers the trip to a new driver
      And the rider's pickup time is not changed where possible

    @TS-27 @US-05 @AC-05.3 @DRV-01 @alternate
    Scenario: Unanswered request times out and is reassigned
      Given a driver-partner has received a scheduled trip request
      When the driver does not respond within the timeout period
      Then the system offers the trip to a new driver
      And the rider's pickup time is not changed where possible

    @TS-28 @US-05 @AC-05.4 @DRV-01 @NTF-01 @negative @derived
    Scenario: No driver accepts before the window closes
      Given a scheduled ride with no accepted driver
      When the assignment window closes
      Then the rider is notified that no driver has been assigned

  # ---- US-X: Cross-cutting: event logging ----
  Rule: Scheduled-ride events are logged

    @TS-29 @US-X @AC-X.1 @positive
    Scenario Outline: Lifecycle events are logged
      Given the rider has a scheduled ride
      When the event "<event>" occurs
      Then the event is recorded with the ride ID, rider ID and a timestamp

      Examples:
        | event             |
        | booking created   |
        | booking edited    |
        | booking cancelled |
        | driver assigned   |
        | reminder sent     |
