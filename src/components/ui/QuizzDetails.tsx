export default function QuizzDetails() {
  return (
    <section className="my-[2rem] p-[1rem] rounded-[4px] bg-blue-100">
      <h4 className="mb-2">Quizz Details</h4>
      <div className="flex px-2">
        <div className="w-[50%]">
          <p className="pb-2">Questions: 10</p>
          <p>Time: 2 minutes</p>
        </div>
        <div className="w-[50%]">
          <p className="pb-2">Type: Multiple Choice</p>
          <p>Points: 1 per correct</p>
        </div>
      </div>
      
    </section>
  )
};