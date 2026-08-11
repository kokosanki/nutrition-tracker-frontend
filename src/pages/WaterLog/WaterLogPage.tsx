import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBottleWater,
  faDroplet,
  faPlus,
  faWineGlass,
} from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PageShell from "@/modules/PageShell/PageShell";
import Header from "@/modules/Header/Header";
import FormField from "@/modules/FormField/FormField";
import FoodListItem from "@/modules/FoodListItem/FoodListItem";
import listStyles from "@/modules/FoodListItem/FoodListItem.module.scss";
import { useWaterLog } from "@/hooks/useWaterLog.ts";
import { useLogWater } from "@/hooks/useLogWater.ts";
import { useDeleteWaterLog } from "@/hooks/useDeleteWaterLog.ts";
import { getTimeLabel, getTodayDateString } from "@/utils/date.ts";
import {
  logWaterSchema,
  type LogWaterFormInput,
  type LogWaterFormValues,
} from "./WaterLogPage.schema.ts";
import styles from "./WaterLogPage.module.scss";

const QUICK_AMOUNTS = [
  { amountMl: 250, icon: faWineGlass },
  { amountMl: 500, icon: faBottleWater },
];

const WaterLogPage = () => {
  const location = useLocation();
  const { date, backTo } =
    (location.state as { date?: string; backTo?: string } | null) ?? {};
  const loggedDate = date ?? getTodayDateString();

  const { entries, totalMl, error: loadError } = useWaterLog(loggedDate);
  const { logWater, isLoading: isLogging, error: logError } = useLogWater();
  const { deleteWaterLog, error: deleteError } = useDeleteWaterLog();
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogWaterFormInput, unknown, LogWaterFormValues>({
    resolver: zodResolver(logWaterSchema),
  });

  const sortedEntries = [...entries].sort((a, b) =>
    a.loggedAt.localeCompare(b.loggedAt),
  );

  const handleQuickAdd = (amountMl: number): void => {
    logWater({ amountMl, loggedDate });
  };

  const onSubmitCustom = (data: LogWaterFormValues): void => {
    logWater(
      { amountMl: data.amountMl, loggedDate },
      {
        onSuccess: () => {
          reset();
          setIsCustomOpen(false);
        },
      },
    );
  };

  const error = loadError ?? logError ?? deleteError;

  return (
    <PageShell center={false}>
      <Header />
      <Link to={backTo ?? "/"} className={styles.backLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>

      <div className={styles.titleRow}>
        <FontAwesomeIcon icon={faDroplet} className={styles.titleIcon} />
        <span className={styles.title}>Water</span>
      </div>
      <p className={styles.amount}>{totalMl.toLocaleString()} ml</p>
      <p className={styles.label}>Logged today</p>

      <h2 className={styles.sectionHeading}>Add a glass</h2>
      <div className={styles.addRow}>
        {QUICK_AMOUNTS.map(({ amountMl, icon }) => (
          <button
            key={amountMl}
            type="button"
            className={styles.addOption}
            onClick={() => handleQuickAdd(amountMl)}
            disabled={isLogging}
          >
            <FontAwesomeIcon icon={icon} />
            {amountMl} ml
          </button>
        ))}
        <button
          type="button"
          className={styles.addOption}
          onClick={() => setIsCustomOpen((open) => !open)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Custom
        </button>
      </div>

      {isCustomOpen && (
        <form className={styles.customForm} onSubmit={handleSubmit(onSubmitCustom)}>
          <FormField
            id="amountMl"
            label="Amount (ml)"
            error={errors.amountMl?.message}
            inputProps={{
              type: "number",
              step: "any",
              min: 0,
              autoFocus: true,
              ...register("amountMl"),
            }}
          />
          <button type="submit" className={styles.customSubmit} disabled={isLogging}>
            Add
          </button>
        </form>
      )}

      <h2 className={styles.sectionHeading}>Logged today</h2>
      {sortedEntries.length === 0 ? (
        <p className={styles.empty}>No water logged yet.</p>
      ) : (
        <ul className={listStyles.list}>
          {sortedEntries.map((entry) => (
            <FoodListItem
              key={entry.id}
              name={`${entry.amountMl} ml`}
              details={getTimeLabel(entry.loggedAt)}
              onDelete={() => deleteWaterLog(entry.id)}
            />
          ))}
        </ul>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </PageShell>
  );
};

export default WaterLogPage;
