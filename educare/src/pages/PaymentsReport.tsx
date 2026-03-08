import { useEffect, useMemo, useState } from "react";
import { Child } from "../types/Child";
import { styles } from "../styles/PaymentsReportStyles";

interface PaymentRecord {
  monthLabel: string;
  amount: number;
  paidDate: string;
}

interface ChildWithPayments extends Child {
  createdAt?: string | number;
  monthlyFee?: number;
  payments?: PaymentRecord[];
}

const DEFAULT_MONTHLY_FEE = 120;

const getStartDate = (child: ChildWithPayments) => {
  const fromCreatedAt = child.createdAt ? new Date(child.createdAt) : null;

  if (fromCreatedAt && !Number.isNaN(fromCreatedAt.getTime())) {
    return new Date(fromCreatedAt.getFullYear(), fromCreatedAt.getMonth(), 1);
  }

  const fromId = new Date(child.id);
  if (!Number.isNaN(fromId.getTime())) {
    return new Date(fromId.getFullYear(), fromId.getMonth(), 1);
  }

  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const formatMonth = (date: Date) =>
  date.toLocaleDateString("sq-AL", {
    month: "long",
    year: "numeric"
  });

const formatDate = (dateValue: string) =>
  new Date(dateValue).toLocaleDateString("sq-AL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

const generatePayments = (child: ChildWithPayments): PaymentRecord[] => {
  if (Array.isArray(child.payments) && child.payments.length > 0) {
    return child.payments;
  }

  const start = getStartDate(child);
  const now = new Date();
  const monthlyFee = child.monthlyFee ?? DEFAULT_MONTHLY_FEE;
  const cursor = new Date(start);
  const generated: PaymentRecord[] = [];

  while (cursor <= now) {
    const paidDate = new Date(cursor.getFullYear(), cursor.getMonth(), 5);
    generated.push({
      monthLabel: formatMonth(cursor),
      amount: monthlyFee,
      paidDate: paidDate.toISOString()
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return generated;
};

const PaymentsReport = () => {
  const [children, setChildren] = useState<ChildWithPayments[]>([]);
  const [query, setQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState<ChildWithPayments | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("children") || "[]");
    setChildren(stored);
  }, []);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedChild(null);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const filteredChildren = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return children;
    }
    return children.filter((child) => child.fullName.toLowerCase().includes(normalized));
  }, [children, query]);

  const reportRows = useMemo(
    () =>
      filteredChildren.map((child) => {
        const payments = generatePayments(child);
        const totalPaid = payments.reduce((sum, record) => sum + record.amount, 0);
        return { child, payments, totalPaid };
      }),
    [filteredChildren]
  );

  const summary = useMemo(() => {
    const totalChildren = reportRows.length;
    const totalPayments = reportRows.reduce((sum, row) => sum + row.payments.length, 0);
    const totalAmount = reportRows.reduce((sum, row) => sum + row.totalPaid, 0);
    return { totalChildren, totalPayments, totalAmount };
  }, [reportRows]);

  const selectedPayments = selectedChild ? generatePayments(selectedChild) : [];

  return (
    <section className={styles.pageCard}>
      <h2 className={styles.pageTitle}>Raport Pagesash</h2>
      <p className={styles.pageSubtitle}>
        Kerkoni femijen sipas emrit dhe hapni historikun e pagesave per cdo muaj.
      </p>

      <div className={styles.reportSummary}>
        <article>
          <span>Femije</span>
          <strong>{summary.totalChildren}</strong>
        </article>
        <article>
          <span>Pagesa gjithsej</span>
          <strong>{summary.totalPayments}</strong>
        </article>
        <article>
          <span>Totali i pagesave</span>
          <strong>{summary.totalAmount} EUR</strong>
        </article>
      </div>

      <div className={styles.searchWrap}>
        <input
          type="text"
          placeholder="Kerko me emrin e femijes..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {reportRows.length === 0 ? (
        <p className={styles.emptyState}>Nuk u gjet asnje femije me kete emer.</p>
      ) : (
        <div className={styles.childrenGrid}>
          {reportRows.map(({ child, totalPaid, payments }) => (
            <button
              key={child.id}
              type="button"
              className={styles.childCard}
              onClick={() => setSelectedChild(child)}
            >
              <h3>{child.fullName}</h3>
              <p>Prindi: {child.parentName}</p>
              <p>Muaj te paguar: {payments.length}</p>
              <p>Totali: {totalPaid} EUR</p>
            </button>
          ))}
        </div>
      )}

      {selectedChild && (
        <div className={styles.modalOverlay} onClick={() => setSelectedChild(null)} aria-hidden="true">
          <div className={styles.paymentModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Pagesat mujore: {selectedChild.fullName}</h3>
              <button type="button" onClick={() => setSelectedChild(null)}>
                Mbyll
              </button>
            </div>

            <div className={styles.paymentList}>
              {selectedPayments.map((payment, index) => (
                <article key={`${payment.monthLabel}-${index}`} className={styles.paymentItem}>
                  <span>{payment.monthLabel}</span>
                  <strong>{payment.amount} EUR</strong>
                  <small>Paguar me: {formatDate(payment.paidDate)}</small>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentsReport;
