import Button from "../Button"

const StepName = ({onNext}) => {
  return (
    <div>
        <div>StepName</div>
        <Button text="Next" onClick={onNext} />
    </div>
  )
}

export default StepName