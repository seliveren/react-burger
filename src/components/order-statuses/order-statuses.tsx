import OrderStatusesStyles from "./order-statuses.module.css";
import React from "react";
import {TOrderData, TWSData} from "../../utils/types";


type TOrderStatusesProps = {
  data: Array<TOrderData>;
  stats: TWSData;
};


export const OrderStatuses: React.FC<TOrderStatusesProps> = ({data, stats}) => {

  return (
    <section className="pt-15">
      <div className={OrderStatusesStyles.currentStatuses}>
        <div>
          <h2 className={`${OrderStatusesStyles.heading} text text_type_main-medium pb-6`}>Готовы:</h2>
          <div className={OrderStatusesStyles.container}>
            {data.map((el, index: number) => {
              if (el.status === 'done' && index < 10) {
                return <span
                  className={`${OrderStatusesStyles.textOrdersReady} text text_type_digits-default`}
                  key={index}>{el.number}</span>
              }
            })}
          </div>
        </div>
        <div>
          <h2 className={`${OrderStatusesStyles.heading} text text_type_main-medium pb-6`}>В работе:</h2>
          <div className={OrderStatusesStyles.container}>
            {data.map((el, index: number) => {
              if (el.status === 'pending' && index < 10) {
                return <span
                  className={`${OrderStatusesStyles.textOrdersPending} text text_type_digits-default`}
                  key={index}>{el.number}</span>
              }
            })}
          </div>
        </div>
      </div>
      <div className="pt-15 pb-15"><h2 className="text text_type_main-medium">Выполнено за все время:</h2><span
        className="text text_type_digits-large">{stats.total}</span></div>
      <div><h2 className="text text_type_main-medium">Выполнено за сегодня:</h2><span
        className="text text_type_digits-large">{stats.totalToday}</span></div>
    </section>
  )
}
