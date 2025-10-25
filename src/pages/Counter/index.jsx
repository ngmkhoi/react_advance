import { decrement, increment, incrementByAmout, selectCount } from "@/features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import images from "@/assets/images";
import styles from './Counter.module.scss'


function Counter(){
    const dispatch = useDispatch();
    const count = useSelector(selectCount)

    return (
        <div className={styles.counter}>
            <div className={styles.imageContainer}>
                <img src={images.reduximg} alt="Redux Logo" />
            </div>
            <div className={styles.controls}>
                <button
                    className={`${styles.button} ${styles.incrementBtn}`}
                    aria-label="Increment Value"
                    onClick={() => dispatch(increment(5))}
                >
                    Increment
                </button>
                <button
                    className={`${styles.button} ${styles.amountBtn}`}
                    aria-label="Increment By Amount"
                    onClick={() => dispatch(incrementByAmout(5))}
                >
                    Increment with amount
                </button>
                <span className={styles.count}>{count}</span>
                <button
                    className={`${styles.button} ${styles.decrementBtn}`}
                    aria-label="Decrement Value"
                    onClick={() => dispatch(decrement(5))}
                >
                    Decrement
                </button>
            </div>
        </div>
    )

}

export default Counter;