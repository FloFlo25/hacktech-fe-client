import { Button } from "./ui/button";

const UserForm = () => {
  return <div className="w-fit rounded-[24px] bg-primary-secondary p-4">
    <div className="flex min-h-[800px] min-w-96 flex-col items-center gap-8 rounded-[12px] bg-white p-4">
      <span className="text-[32px] font-bold text-primary-dark">Surveys</span>
      <div className="min-w-80 p-4 flex text-center justify-between align-center rounded-[10px] bg-primary-secondary gap-8 text-bold">
        <span className="text-center">Employee Satisfaction Survey</span>
        <Button className="w-fit">
          <span>Play</span>
        </Button>
      </div>
    </div>
  
  </div>;
}
export default UserForm;
