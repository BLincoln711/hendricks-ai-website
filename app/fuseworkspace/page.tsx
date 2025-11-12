'use client';

import { useState, useEffect } from 'react';

interface Campaign {
  campaign: string;
  cost: number;
  costChange: number;
  cpc: number;
  cpcChange: number;
  clicks: number;
  clicksChange: number;
  conversions: number;
  conversionsChange: number;
  bookAppointments: number;
  phoneLeads: number;
  submitLeads: number;
  convRate: number;
  convRateChange: number;
  costPerConv: number;
  costPerConvChange: number;
}

export default function FuseWorkspaceDashboard() {
  const [campaignData] = useState<Campaign[]>([
    {
      campaign: "HOU | CityCentre | Search | Max Clicks",
      cost: 751.79,
      costChange: 4.10,
      cpc: 7.09,
      cpcChange: -9.53,
      clicks: 106,
      clicksChange: 6.00,
      conversions: 1.00,
      conversionsChange: 0,
      bookAppointments: 0.00,
      phoneLeads: 1.00,
      submitLeads: 0.00,
      convRate: 0.94,
      convRateChange: 0,
      costPerConv: 751.79,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | Bee Caves | Search | Conversions",
      cost: 739.94,
      costChange: -2.37,
      cpc: 9.14,
      cpcChange: 8.48,
      clicks: 81,
      clicksChange: -10.00,
      conversions: 0.00,
      conversionsChange: -100.00,
      bookAppointments: 0.00,
      phoneLeads: 0.00,
      submitLeads: 0.00,
      convRate: 0.00,
      convRateChange: 0,
      costPerConv: 0.00,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | Four Points | Search | Max Clicks",
      cost: 760.04,
      costChange: 0.00,
      cpc: 5.98,
      cpcChange: 27.55,
      clicks: 127,
      clicksChange: -21.60,
      conversions: 5.00,
      conversionsChange: -64.29,
      bookAppointments: 2.00,
      phoneLeads: 0.00,
      submitLeads: 3.00,
      convRate: 3.94,
      convRateChange: 0,
      costPerConv: 152.01,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | Dripping Springs | Leads | Performance Max",
      cost: 961.59,
      costChange: -4.33,
      cpc: 6.37,
      cpcChange: -2.45,
      clicks: 151,
      clicksChange: -1.95,
      conversions: 13.00,
      conversionsChange: 30.00,
      bookAppointments: 6.00,
      phoneLeads: 0.00,
      submitLeads: 7.00,
      convRate: 3.47,
      convRateChange: 0,
      costPerConv: 73.97,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | Four Points | Leads | Performance Max",
      cost: 3046.53,
      costChange: 0.20,
      cpc: 6.62,
      cpcChange: 57.92,
      clicks: 460,
      clicksChange: -36.55,
      conversions: 15.00,
      conversionsChange: -16.67,
      bookAppointments: 5.50,
      phoneLeads: 4.00,
      submitLeads: 5.50,
      convRate: 1.60,
      convRateChange: 0,
      costPerConv: 203.10,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | Bee Caves | Leads | Performance Max",
      cost: 3836.68,
      costChange: 10.47,
      cpc: 8.06,
      cpcChange: 88.22,
      clicks: 476,
      clicksChange: -41.31,
      conversions: 14.00,
      conversionsChange: -22.22,
      bookAppointments: 7.00,
      phoneLeads: 0.00,
      submitLeads: 7.00,
      convRate: 0.74,
      convRateChange: 0,
      costPerConv: 274.05,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | East MLK | Leads | Performance Max",
      cost: 3742.38,
      costChange: -1.54,
      cpc: 6.33,
      cpcChange: 38.95,
      clicks: 591,
      clicksChange: -29.14,
      conversions: 12.00,
      conversionsChange: -36.84,
      bookAppointments: 6.00,
      phoneLeads: 0.00,
      submitLeads: 6.00,
      convRate: 0.20,
      convRateChange: 0,
      costPerConv: 311.86,
      costPerConvChange: 0
    },
    {
      campaign: "ATX | East MLK | Leads | Search",
      cost: 2996.44,
      costChange: -2.06,
      cpc: 11.84,
      cpcChange: -11.74,
      clicks: 253,
      clicksChange: 10.96,
      conversions: 3.00,
      conversionsChange: -50.00,
      bookAppointments: 2.00,
      phoneLeads: 1.00,
      submitLeads: 1.00,
      convRate: 1.19,
      convRateChange: 0,
      costPerConv: 998.81,
      costPerConvChange: 0
    },
    {
      campaign: "HOU | CityCentre | P-Max",
      cost: 6041.91,
      costChange: 5.62,
      cpc: 5.88,
      cpcChange: 133.33,
      clicks: 1028,
      clicksChange: -54.73,
      conversions: 30.00,
      conversionsChange: -42.31,
      bookAppointments: 15.00,
      phoneLeads: 0.00,
      submitLeads: 15.00,
      convRate: 1.53,
      convRateChange: 0,
      costPerConv: 201.40,
      costPerConvChange: 0
    }
  ]);

  const totals = campaignData.reduce((acc, row) => ({
    cost: acc.cost + row.cost,
    clicks: acc.clicks + row.clicks,
    conversions: acc.conversions + row.conversions,
    bookAppointments: acc.bookAppointments + row.bookAppointments,
    phoneLeads: acc.phoneLeads + row.phoneLeads,
    submitLeads: acc.submitLeads + row.submitLeads
  }), { cost: 0, clicks: 0, conversions: 0, bookAppointments: 0, phoneLeads: 0, submitLeads: 0 });

  const costPerAppt = totals.bookAppointments > 0 ? totals.cost / totals.bookAppointments : 0;
  const apptRate = totals.clicks > 0 ? (totals.bookAppointments / totals.clicks) * 100 : 0;

  const calculateWeightedAverage = (data: Campaign[], changeField: keyof Campaign, weightField: keyof Campaign) => {
    const totalWeight = data.reduce((sum, item) => sum + (item[weightField] as number), 0);
    if (totalWeight === 0) return 0;
    const weightedSum = data.reduce((sum, item) => sum + ((item[changeField] as number) * (item[weightField] as number)), 0);
    return weightedSum / totalWeight;
  };

  const avgCostChange = calculateWeightedAverage(campaignData, 'costChange', 'cost');

  const getTrendIcon = (change: number, reversedGood: boolean) => {
    if (Math.abs(change) < 0.1) return { symbol: '→', color: '#718096' };
    const isGood = reversedGood ? change < 0 : change > 0;
    const symbol = change > 0 ? '↑' : '↓';
    const color = isGood ? '#48bb78' : '#f56565';
    return { symbol, color, value: Math.abs(change).toFixed(1) };
  };

  const getChangeClass = (change: number, label: string) => {
    if (label.toLowerCase().includes('cost') || label.toLowerCase().includes('cpc') || label.toLowerCase().includes('cpa')) {
      if (change < -2) return 'positive';
      if (change > 2) return 'negative';
    } else {
      if (change > 2) return 'positive';
      if (change < -2) return 'negative';
    }
    return 'neutral';
  };

  const totalAppointments = campaignData.reduce((sum, c) => sum + c.bookAppointments, 0);
  const bestAppointments = [...campaignData].filter(c => c.bookAppointments > 0).sort((a, b) => b.bookAppointments - a.bookAppointments)[0];
  const bestCostPerAppt = [...campaignData].filter(c => c.bookAppointments > 0).sort((a, b) => (a.cost / a.bookAppointments) - (b.cost / b.bookAppointments))[0];
  const worstPerformer = [...campaignData].filter(c => c.cost > 500 && c.bookAppointments === 0)[0];
  const houTotal = campaignData.filter(c => c.campaign.includes('HOU')).reduce((sum, c) => sum + c.bookAppointments, 0);
  const atxTotal = campaignData.filter(c => c.campaign.includes('ATX')).reduce((sum, c) => sum + c.bookAppointments, 0);

  const houCampaigns = campaignData.filter(c => c.campaign.includes('HOU'));
  const atxCampaigns = campaignData.filter(c => c.campaign.includes('ATX'));

  const houTotals = houCampaigns.reduce((acc, c) => ({
    cost: acc.cost + c.cost,
    bookAppointments: acc.bookAppointments + c.bookAppointments,
    clicks: acc.clicks + c.clicks
  }), { cost: 0, bookAppointments: 0, clicks: 0 });

  const atxTotals = atxCampaigns.reduce((acc, c) => ({
    cost: acc.cost + c.cost,
    bookAppointments: acc.bookAppointments + c.bookAppointments,
    clicks: acc.clicks + c.clicks
  }), { cost: 0, bookAppointments: 0, clicks: 0 });

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          min-height: 100vh;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .header h1 {
          color: #1a202c;
          font-size: 32px;
          margin-bottom: 10px;
        }

        .header p {
          color: #718096;
          font-size: 14px;
        }

        .date-range {
          background: #f7fafc;
          padding: 10px 15px;
          border-radius: 6px;
          display: inline-block;
          margin-top: 10px;
          font-size: 13px;
          color: #4a5568;
          font-weight: 600;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .metric-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .metric-card.highlight {
          background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
          border: 2px solid #38b2ac;
        }

        .metric-label {
          color: #718096;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .metric-label.highlight {
          color: #234e52;
          font-weight: 700;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 10px;
        }

        .metric-value.highlight {
          color: #234e52;
          font-size: 36px;
        }

        .metric-change {
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .metric-change.positive {
          color: #48bb78;
        }

        .metric-change.negative {
          color: #f56565;
        }

        .metric-change.neutral {
          color: #718096;
        }

        .location-section, .table-section, .insights-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .location-section h2, .table-section h2, .insights-section h2 {
          color: #1a202c;
          margin-bottom: 20px;
          font-size: 24px;
        }

        .location-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .location-card {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .location-name {
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 15px;
        }

        .location-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .location-stat {
          font-size: 12px;
        }

        .location-stat-label {
          color: #718096;
          font-weight: 600;
        }

        .location-stat-value {
          color: #1a202c;
          font-weight: 700;
          font-size: 16px;
        }

        .table-section {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #f7fafc;
          padding: 15px;
          text-align: left;
          font-weight: 700;
          color: #1a202c;
          font-size: 12px;
          text-transform: uppercase;
        }

        td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
        }

        tr:hover {
          background: #f7fafc;
        }

        .campaign-name {
          font-weight: 600;
          color: #1a202c;
        }

        .trend-indicator {
          display: inline-block;
          margin-left: 5px;
        }

        .insight-card {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 4px solid #48bb78;
        }

        .insight-card.warning {
          border-left-color: #f56565;
        }

        .insight-card.neutral {
          border-left-color: #4299e1;
        }

        .insight-title {
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .insight-text {
          color: #4a5568;
          font-size: 14px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .location-grid {
            grid-template-columns: 1fr;
          }

          .table-section {
            padding: 15px;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1>Fuse Workspace - Google Ads Performance</h1>
          <p>Month-over-Month Analytics Dashboard</p>
          <div className="date-range">Data as of: October 2025</div>
        </div>

        {/* Summary Metrics */}
        <div className="metrics-grid">
          <div className="metric-card highlight">
            <div className="metric-label highlight">Total Book Appointments 🎯</div>
            <div className="metric-value highlight">{totals.bookAppointments.toFixed(0)}</div>
            <div className="metric-change neutral">
              <span>→</span>
              <span>0.0% MoM</span>
            </div>
          </div>

          <div className="metric-card highlight">
            <div className="metric-label highlight">Cost Per Appointment 🎯</div>
            <div className="metric-value highlight">${costPerAppt.toFixed(2)}</div>
            <div className="metric-change neutral">
              <span>→</span>
              <span>0.0% MoM</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Monthly Cost</div>
            <div className="metric-value">${totals.cost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div className={`metric-change ${getChangeClass(avgCostChange, 'cost')}`}>
              <span>{avgCostChange > 0 ? '↑' : avgCostChange < 0 ? '↓' : '→'}</span>
              <span>{Math.abs(avgCostChange).toFixed(1)}% MoM</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Phone Leads</div>
            <div className="metric-value">{totals.phoneLeads.toFixed(0)}</div>
            <div className="metric-change neutral">
              <span>→</span>
              <span>0.0% MoM</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Submit Form Leads</div>
            <div className="metric-value">{totals.submitLeads.toFixed(0)}</div>
            <div className="metric-change neutral">
              <span>→</span>
              <span>0.0% MoM</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Appointment Rate</div>
            <div className="metric-value">{apptRate.toFixed(2)}%</div>
            <div className="metric-change neutral">
              <span>→</span>
              <span>0.0% MoM</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="insights-section">
          <h2>Key Insights</h2>
          {bestAppointments && (
            <div className="insight-card">
              <div className="insight-title">Top Appointment Generator</div>
              <div className="insight-text">
                {bestAppointments.campaign} generated {bestAppointments.bookAppointments.toFixed(0)} book appointments this week, accounting for {((bestAppointments.bookAppointments / totalAppointments) * 100).toFixed(0)}% of all appointments.
              </div>
            </div>
          )}

          {bestCostPerAppt && (
            <div className="insight-card">
              <div className="insight-title">Most Efficient Campaign</div>
              <div className="insight-text">
                {bestCostPerAppt.campaign} has the lowest cost per appointment at ${(bestCostPerAppt.cost / bestCostPerAppt.bookAppointments).toFixed(2)}, generating {bestCostPerAppt.bookAppointments.toFixed(0)} appointments efficiently.
              </div>
            </div>
          )}

          {worstPerformer && (
            <div className="insight-card warning">
              <div className="insight-title">No Appointments Generated</div>
              <div className="insight-text">
                {worstPerformer.campaign} spent ${worstPerformer.cost.toFixed(2)} without generating book appointments. Consider optimizing ad copy or targeting to drive appointment bookings.
              </div>
            </div>
          )}

          <div className="insight-card neutral">
            <div className="insight-title">Location Performance</div>
            <div className="insight-text">
              Austin locations generated {atxTotal.toFixed(0)} appointments vs Houston's {houTotal.toFixed(0)} appointments. {atxTotal > houTotal ? 'Austin' : 'Houston'} is leading in appointment bookings this week.
            </div>
          </div>
        </div>

        {/* Location Breakdown */}
        <div className="location-section">
          <h2>Performance by Location</h2>
          <div className="location-grid">
            <div className="location-card">
              <div className="location-name">Houston - CityCentre</div>
              <div className="location-stats">
                <div className="location-stat">
                  <div className="location-stat-label">Book Appointments 🎯</div>
                  <div className="location-stat-value" style={{color: '#38b2ac', fontSize: '20px'}}>{houTotals.bookAppointments.toFixed(0)}</div>
                </div>
                <div className="location-stat">
                  <div className="location-stat-label">Cost/Appt</div>
                  <div className="location-stat-value">${houTotals.bookAppointments > 0 ? (houTotals.cost / houTotals.bookAppointments).toFixed(2) : '0.00'}</div>
                </div>
                <div className="location-stat">
                  <div className="location-stat-label">Monthly Cost</div>
                  <div className="location-stat-value">${houTotals.cost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div className="location-stat">
                  <div className="location-stat-label">Appt. Rate</div>
                  <div className="location-stat-value">{houTotals.clicks > 0 ? ((houTotals.bookAppointments / houTotals.clicks) * 100).toFixed(2) : '0.00'}%</div>
                </div>
              </div>
            </div>

            <div className="location-card">
              <div className="location-name">Austin Markets</div>
              <div className="location-stats">
                <div className="location-stat">
                  <div className="location-stat-label">Book Appointments 🎯</div>
                  <div className="location-stat-value" style={{color: '#38b2ac', fontSize: '20px'}}>{atxTotals.bookAppointments.toFixed(0)}</div>
                </div>
                <div className="location-stat">
                  <div className="location-stat-label">Cost/Appt</div>
                  <div className="location-stat-value">${atxTotals.bookAppointments > 0 ? (atxTotals.cost / atxTotals.bookAppointments).toFixed(2) : '0.00'}</div>
                </div>
                <div className="location-stat">
                  <div className="location-stat-label">Monthly Cost</div>
                  <div className="location-stat-value">${atxTotals.cost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div className="location-stat">
                  <div className="location-stat-label">Appt. Rate</div>
                  <div className="location-stat-value">{atxTotals.clicks > 0 ? ((atxTotals.bookAppointments / atxTotals.clicks) * 100).toFixed(2) : '0.00'}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="table-section">
          <h2>Campaign Performance Detail</h2>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Cost</th>
                <th>CPC</th>
                <th>Clicks</th>
                <th style={{background: '#e6fffa', color: '#234e52'}}>Book Appts</th>
                <th>Phone Leads</th>
                <th>Submit Leads</th>
                <th>Total Conv.</th>
                <th>Cost/Appt</th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((campaign, index) => {
                const costPerAppt = campaign.bookAppointments > 0 ? campaign.cost / campaign.bookAppointments : 0;
                const costTrend = getTrendIcon(campaign.costChange, true);
                const cpcTrend = getTrendIcon(campaign.cpcChange, true);
                const clicksTrend = getTrendIcon(campaign.clicksChange, false);
                const convTrend = getTrendIcon(campaign.conversionsChange, false);

                return (
                  <tr key={index}>
                    <td className="campaign-name">{campaign.campaign}</td>
                    <td>
                      ${campaign.cost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      <span className="trend-indicator" style={{color: costTrend.color}}>
                        {costTrend.symbol} {costTrend.value}%
                      </span>
                    </td>
                    <td>
                      ${campaign.cpc.toFixed(2)}
                      <span className="trend-indicator" style={{color: cpcTrend.color}}>
                        {cpcTrend.symbol} {cpcTrend.value}%
                      </span>
                    </td>
                    <td>
                      {campaign.clicks.toLocaleString()}
                      <span className="trend-indicator" style={{color: clicksTrend.color}}>
                        {clicksTrend.symbol} {clicksTrend.value}%
                      </span>
                    </td>
                    <td style={{background: '#f0fdfa', fontWeight: 700, color: '#234e52'}}>
                      {campaign.bookAppointments.toFixed(1)}
                    </td>
                    <td>
                      {campaign.phoneLeads.toFixed(1)}
                    </td>
                    <td>
                      {campaign.submitLeads.toFixed(1)}
                    </td>
                    <td>
                      {campaign.conversions.toFixed(0)}
                      <span className="trend-indicator" style={{color: convTrend.color}}>
                        {convTrend.symbol} {convTrend.value}%
                      </span>
                    </td>
                    <td>
                      ${costPerAppt > 0 ? costPerAppt.toFixed(2) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}