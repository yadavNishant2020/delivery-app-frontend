export interface Order {
    orderNo: string;
    status: string;
    statusColor: string;
  }

export const orderData = [
    { orderNo: '#11250', status: 'Pickup Pending', statusColor: '#FF5963' },  
    { orderNo: '#11251', status: 'Pickup Failed', statusColor: '#E81F2B' },   
    { orderNo: '#11252', status: 'Pickup Rescheduled', statusColor: '#0050AA' },
    { orderNo: '#11254', status: 'Delivery Failed', statusColor: '#E81F2B' }, 
    { orderNo: '#11255', status: 'Delivered', statusColor: '#34A853' },      
    { orderNo: '#11256', status: 'Delivery Pending', statusColor: '#FF5963' },
    { orderNo: '#11257', status: 'Delivery Rescheduled', statusColor: '#0050AA' },
];
