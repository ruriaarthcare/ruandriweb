
export interface Booking {
  id: string;
  createdAt: number;
  expireAt: number;
  isClosed: boolean;


  userData: {
    name: string;
    email: string;
    phone: string;
  };

  appointment: {
    date: string;
    time: string;
  };

  subscription: {
    type: string;
    duration: string;
    amount: number;
    discount: number;
    discountedAmount: number;
    description?: string;

  };

  data:{
    Q1: string;
    Q2: string;
    Q3: string;
    Q4: string;    
    Q5: string;
    Q6: string;
    Q7: string;
    Q8: string;
    Q9: string;
    Q10: string;
    Q11: string;
    Q12: string;
    Q13: string;
    Q14: string;
    Q15: string;
    Q16: string;

    additionalNotes?: string;
  }

}


