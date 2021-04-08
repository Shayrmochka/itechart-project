import React, { useEffect, useState } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";

import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { useSelector } from "react-redux";

function CalendarPage() {
  const acceptedOrders = useSelector((state) => state.orders.acceptedOrders);

  const formatOrders = (orders) => {
    const formated = orders.map((e) => ({
      ...e,
      StartTime: new Date(e.dateCleaning),
      EndTime: new Date(new Date(e.dateCleaning).getTime() + e.time * 60000),
      Id: e._id,
      IsAllDay: false,
      Subject: e.serviceName,
      Priority: "High",
      Location: e.address,
      Description: `${e.flatDescription} (${e.price}$)`,
    }));
    return formated;
  };

  return (
    <ScheduleComponent
      currentView="Month"
      eventSettings={{ dataSource: formatOrders(acceptedOrders) }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default CalendarPage;
