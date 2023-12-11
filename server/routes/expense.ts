import express, { Request, Response } from 'express';
const router = express.Router();
import Expense, { IExpense } from '../models/expense.model';

router.route('/').get(async (req: Request, res: Response) => {
  try {
    const expenses: IExpense[] = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req: Request, res: Response) => {
  try {
    const { name, expensetype, amount, phone, email, status, date } = req.body;

    const newExpense: IExpense = new Expense({
      name,
      expensetype,
      amount,
      phone: Number(phone),
      email,
      status,
      date: new Date(date), // Convert to Date object
    });

    await newExpense.save();
    res.json('Expense added');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const expense: IExpense | null = await Expense.findById(req.params.id);
    res.json(expense);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json('Expense deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').put(async (req: Request, res: Response) => {
  try {
    const expense: IExpense | null = await Expense.findById(req.params.id);

    if (expense) {
      expense.name = req.body.name;
      expense.expensetype = req.body.expensetype;
      expense.amount = req.body.amount;
      expense.phone = Number(req.body.phone);
      expense.email = req.body.email;
      expense.status = req.body.status;
      expense.date = new Date(req.body.date); // Convert to Date object

      await expense.save();
      res.json('Expense updated successfully');
    } else {
      res.status(404).json('Expense not found');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

export = router;
