import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar, Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, Grid } from '@material-ui/core';
import useHttp from '../../hooks/http.hook';
import useMessage from '../../hooks/message.hook';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(0),
    backgroundColor: 'transparent',
  },
  card: {
    height: '100%',
    display: 'flex',
  },
  cardBox: {
    maxWidth: '50%',
    flexBasis: '50%',
    minHeight: '140px',
    backgroundColor: 'transparent',
  },
  barContainer: {
    maxWidth: '50%',
    flexBasis: '50%',
    minHeight: '140px',
  },
}));

function BarChart({ companyId, feedbacks }) {
  const classes = useStyles();
  const { request } = useHttp();
  const message = useMessage();
  const [orders, setOrders] = useState([]);
  const [marks, setMarks] = useState({});

  const [ordersSortedByAccepted, setOrdersSortedByAccepted] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const fetched = await request('/api/order/orders-chart', 'GET', null, {
        id: companyId,
      });
      setOrders(fetched);
    } catch (e) {
      message(e);
    }
  }, [companyId, message, request]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const getMarks = () => {
      const defaultMarks = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      };

      feedbacks.forEach((e) => {
        switch (e.rating) {
          case '1':
            setMarks(defaultMarks.one += 1);
            break;
          case '2':
            setMarks(defaultMarks.two += 1);
            break;
          case '3':
            setMarks(defaultMarks.three += 1);
            break;
          case '4':
            setMarks(defaultMarks.four += 1);
            break;
          case '5':
            setMarks(defaultMarks.five += 1);
            break;
          default: setMarks(defaultMarks);
        }
      });
      setMarks(defaultMarks);
    };
    getMarks();
  }, [feedbacks]);

  useEffect(() => {
    setOrdersSortedByAccepted(
      orders.filter((order) => order.status === 'accepted'),
    );
  }, [orders]);

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.cardBox}
          >
            <Card className={classes.card}>
              <Bar
                data={{
                  labels: ['1', '2', '3', '4', '5'],
                  datasets: [
                    {
                      label: 'Marks',
                      data: [
                        marks.one,
                        marks.two,
                        marks.three,
                        marks.four,
                        marks.five,
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(255, 159, 64, 0.4)',
                        'rgba(255, 205, 86, 0.4)',

                        'rgba(54, 162, 235, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',

                        'rgb(54, 162, 235)',
                        'rgb(75, 192, 192)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={200}
                width={400}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.barContainer}
          >
            <Card className={classes.card}>
              <Doughnut
                data={{
                  labels: ['Declined orders', 'Accepted orders'],
                  datasets: [
                    {
                      label: 'Orders',
                      data: [
                        orders.length - ordersSortedByAccepted.length,

                        ordersSortedByAccepted.length,
                      ],
                      backgroundColor: ['rgba(255, 99, 132,1)', '#78e08f'],
                      borderColor: ['white', 'white'],
                      hoverOffset: 4,
                    },
                  ],
                }}
                height={200}
                width={400}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

BarChart.propTypes = {
  companyId: PropTypes.string.isRequired,
  feedbacks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BarChart;
