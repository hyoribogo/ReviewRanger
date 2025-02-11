import { useFormContext } from 'react-hook-form'
import { ReviewDetailedData } from '@/types'
import { ReceiverItem, QuestionItem } from '../'
import {
  useHandleReceiver,
  useHandleQuestion,
  useClickNextButton,
} from '../../hooks'
import { ReviewReplyEndType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: ReviewDetailedData
}

const ReviewReply = ({ reviewData }: ReviewReplyProps) => {
  const { getValues } = useFormContext<ReviewReplyEndType>()
  const receivers = getValues('receiverList')
  const questions = reviewData.questions

  const {
    selectedReceiver,
    setSelectedReceiver,
    selectedReceiverIndex,
    setSelectedReceiverIndex,
    handleClickReceiver,
  } = useHandleReceiver({ receivers })

  const {
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    handleClickQuestion,
  } = useHandleQuestion({ questions, selectedReceiverIndex })

  const { handleClickNextButton } = useClickNextButton({
    questions,
    receivers,
    selectedQuestionIndex,
    setSelectedQuestionIndex,
    selectedReceiverIndex,
    setSelectedReceiver,
    setSelectedReceiverIndex,
  })

  const questionArray = questions.map((question, index) => (
    <Questions
      question={question}
      index={index}
      receiverIndex={selectedReceiverIndex}
    />
  ))

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div className="flex flex-col gap-5 pt-2.5">
        <div className="mt-2 flex items-center gap-2 text-base md:text-xl">
          <span className="text-gray-300 dark:text-gray-400 ">
            응답 대상자:
          </span>
          <span className="text-sub-orange dark:text-sub-yellow">
            {selectedReceiver.name}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <ul className="flex items-center gap-2.5 overflow-x-auto">
            {receivers.map((receiver) => (
              <ReceiverItem
                key={receiver.receiverId}
                receiver={receiver}
                selectedReceiver={selectedReceiver}
                handleClickReceiver={handleClickReceiver}
              />
            ))}
          </ul>
          <ul className="flex items-center gap-5 overflow-x-auto">
            {questions.map((question, index) => (
              <QuestionItem
                index={index}
                key={question.id}
                selectedQuestionIndex={selectedQuestionIndex}
                question={question}
                handleClickQuestion={handleClickQuestion}
              />
            ))}
          </ul>
          <hr />
        </div>
        {questionArray[selectedQuestionIndex]}
      </div>
      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleClickNextButton}
          className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
        >
          다음
        </button>
      </div>
    </div>
  )
}

export default ReviewReply
