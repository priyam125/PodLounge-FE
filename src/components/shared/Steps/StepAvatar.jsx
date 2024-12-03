import Button from "../Button"

const StepAvatar = ({onNext}) => {
  return (
    <div>
        <div>StepAvatar</div>
        <Button text="Next" onClick={onNext} />
    </div>
  )
}

export default StepAvatar