import React from 'react';
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from '@syncfusion/ej2-react-schedule';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { IOrder } from '../../interfaces/models.interfaces';

const CalendarPage = () => {
  const acceptedOrders: IOrder[] = useSelector((state: RootState) => state.orders.acceptedOrders);

  const formatOrders = (orders: IOrder[]) => {
    const formated = orders.map((e) => ({
      ...e,
      StartTime: new Date(e.dateCleaning),
      EndTime: new Date(new Date(e.dateCleaning).getTime() + e.time * 60000),
      Id: e._id,
      IsAllDay: false,
      Subject: e.serviceName,
      Priority: 'High',
      Location: e.address,
      Description: `${e.owner.firstName} ${e.owner.lastName}: ${e.flatDescription} (${e.price}$)`,
    }));
    return formated;
  };

  return (
    <ScheduleComponent
      width="100%"
      height="550px"
      currentView="Month"
      eventSettings={{ dataSource: formatOrders(acceptedOrders) }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default CalendarPage;
